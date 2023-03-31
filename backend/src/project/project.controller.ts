import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'
import { ProjectService } from './project.service'
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateProjectMemberDto,
  DeleteProjectMemberDto,
} from './dto/project.dto'
import { ProjectMember } from './interfaces/project.interface'
import { Project, Diagram } from '@prisma/client'

@UseGuards(AuthGuard('jwt'))
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(@Req() req: Request): Promise<(Project & { diagrams: Diagram[] })[]> {
    return this.projectService.getProjects(req.user.id)
  }

  @Get(':id')
  getProjectById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
  ): Promise<Project & { diagrams: Diagram[] }> {
    return this.projectService.getProjectById(req.user.id, projectId)
  }

  @Get(':id/users')
  getProjectMembersById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
  ): Promise<ProjectMember[]> {
    return this.projectService.getProjectMembersById(req.user.id, projectId)
  }

  @Post()
  createTask(@Req() req: Request, @Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(req.user.id, dto)
  }

  @Post(':id')
  createProjectMemberByEmail(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    return this.projectService.createProjectMemberByEmail(req.user.id, projectId, dto)
  }

  @Patch(':id')
  updateProjectById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProjectById(req.user.id, projectId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProjectById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
  ): Promise<void> {
    return this.projectService.deleteProjectById(req.user.id, projectId)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id/member')
  deleteProjectMemberByEmail(
    @Req() req: Request,
    @Param('id', ParseIntPipe) projectId: number,
    @Body() dto: DeleteProjectMemberDto,
  ): Promise<void> {
    return this.projectService.deleteProjectMemberByEmail(req.user.id, projectId, dto)
  }
}
