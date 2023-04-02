import { Injectable, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ProjectService } from '../project/project.service'
import { CreateDiagramDto, UpdateDiagramDto } from './dto/diagram.dto'
import { Diagram } from '@prisma/client'

@Injectable()
export class DiagramService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly projectService: ProjectService,
  ) {}

  async getDiagrams(userId: number, projectId: number): Promise<Diagram[]> {
    const project = await this.projectService.getProjectById(userId, projectId)

    return project.diagrams
  }

  async getDiagramById(userId: number, projectId: number, diagramId: number): Promise<Diagram> {
    const diagram = await this.prisma.diagram.findUnique({ where: { id: diagramId } })
    if (!diagram) throw new ForbiddenException('Diagram does not exist')

    const project = await this.projectService.getProjectById(userId, diagram.projectId)
    if (!project || project.id !== projectId)
      throw new ForbiddenException('No permission for diagram')

    return diagram
  }

  async createDiagram(userId: number, projectId: number, dto: CreateDiagramDto): Promise<Diagram> {
    await this.projectService.getProjectById(userId, projectId) // check permission and existance
    const newDiagram = await this.prisma.diagram.create({
      data: { projectId: projectId, ...dto },
    })
    return newDiagram
  }

  async updateDiagramById(
    userId: number,
    projectId: number,
    diagramId: number,
    dto: UpdateDiagramDto,
  ): Promise<Diagram> {
    await this.getDiagramById(userId, projectId, diagramId) // check permission and existance
    return this.prisma.diagram.update({
      where: {
        id: diagramId,
      },
      data: {
        updatedAt: new Date(),
        ...dto,
      },
    })
  }

  async deleteDiagramById(userId: number, projectId: number, diagramId: number): Promise<void> {
    await this.getDiagramById(userId, projectId, diagramId) // check permission and existance

    await this.prisma.diagram.delete({
      where: {
        id: diagramId,
      },
    })
  }
}
