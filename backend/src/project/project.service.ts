import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateProjectMemberDto,
  DeleteProjectMemberDto,
} from './dto/project.dto'
import { Project, Diagram } from '@prisma/client'
import { ProjectMember } from './interfaces/project.interface'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getProjects(userId: number): Promise<(Project & { diagrams: Diagram[] })[]> {
    const projects = await this.prisma.projectUser.findMany({
      where: { userId: userId },
      select: {
        project: { include: { diagrams: true } },
      },
    })
    return projects.map((p) => p.project)
  }

  async getProjectById(
    userId: number,
    projectId: number,
  ): Promise<Project & { diagrams: Diagram[] }> {
    const projects = await this.getProjects(userId)
    const project = projects.find((p) => p.id === projectId)

    if (!project) throw new ForbiddenException('No permission for project, or it does not exist.')

    return project
  }

  async createProject(userId: number, dto: CreateProjectDto): Promise<Project> {
    const newProject = await this.prisma.$transaction(async (prisma) => {
      const project = await prisma.project.create({
        data: {
          ...dto,
        },
      })

      await prisma.projectUser.create({
        data: {
          project: {
            connect: {
              id: project.id,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      return project
    })
    return newProject
  }

  async updateProjectById(
    userId: number,
    projectId: number,
    dto: UpdateProjectDto,
  ): Promise<Project> {
    await this.getProjectById(userId, projectId) // check permission and existance
    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        ...dto,
      },
    })
  }

  async deleteProjectById(userId: number, projectId: number): Promise<void> {
    await this.getProjectById(userId, projectId) // check permission and existance

    await this.prisma.$transaction(async (prisma) => {
      await prisma.diagram.deleteMany({
        where: { projectId: projectId },
      })

      await prisma.projectUser.deleteMany({
        where: { projectId: projectId },
      })

      await prisma.project.delete({
        where: {
          id: projectId,
        },
      })
    })
  }

  async getProjectMembersById(userId: number, projectId: number): Promise<ProjectMember[]> {
    await this.getProjectById(userId, projectId) // check permission and existance

    const members = await this.prisma.projectUser.findMany({
      where: { projectId: projectId },
      select: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })
    return members.map((o) => o.user)
  }

  async createProjectMemberByEmail(
    userId: number,
    projectId: number,
    dto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    const project = await this.getProjectById(userId, projectId)

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })
    if (!user) throw new ForbiddenException('User not exist')

    await this.prisma.projectUser.create({
      data: {
        userId: user.id,
        projectId: project.id,
      },
    })

    const { hashedPassword, createdAt, id, ...invitedUser } = user
    return invitedUser
  }

  async deleteProjectMemberByEmail(
    userId: number,
    projectId: number,
    dto: DeleteProjectMemberDto,
  ): Promise<void> {
    await this.getProjectById(userId, projectId) // check user permission and existance

    const targetUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })
    if (!targetUser) throw new ForbiddenException('User does not exist')

    const members = await this.getProjectMembersById(userId, projectId)
    if (members.length <= 1)
      throw new ForbiddenException('User is only menber, so cannot remove from members')

    await this.prisma.projectUser.delete({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: targetUser.id,
        },
      },
    })
  }
}
