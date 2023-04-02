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
import { DiagramService } from '../diagram/diagram.service'
import { CreateDiagramDto, UpdateDiagramDto } from '../diagram/dto/diagram.dto'
import { Project, Diagram } from '@prisma/client'

@UseGuards(AuthGuard('jwt'))
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly diagramService: DiagramService,
  ) {}

  @Get()
  getProjects(@Req() req: Request): Promise<(Project & { diagrams: Diagram[] })[]> {
    return this.projectService.getProjects(req.user.id)
  }

  @Get(':projectId')
  getProjectById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<Project & { diagrams: Diagram[] }> {
    return this.projectService.getProjectById(req.user.id, projectId)
  }

  @Get(':projectId/members')
  getProjectMembersById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<ProjectMember[]> {
    return this.projectService.getProjectMembersById(req.user.id, projectId)
  }

  @Get(':projectId/diagrams')
  getDiagrams(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<Diagram[]> {
    return this.diagramService.getDiagrams(req.user.id, projectId)
  }

  @Get(':projectId/diagram/:diagramId')
  getDiagramById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('diagramId', ParseIntPipe) diagramId: number,
  ): Promise<Diagram> {
    return this.diagramService.getDiagramById(req.user.id, projectId, diagramId)
  }

  @Post()
  createProject(@Req() req: Request, @Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(req.user.id, dto)
  }

  @Post(':projectId/member')
  createProjectMemberByEmail(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateProjectMemberDto,
  ): Promise<ProjectMember> {
    return this.projectService.createProjectMemberByEmail(req.user.id, projectId, dto)
  }

  @Post(':projectId/diagram')
  createDiagram(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateDiagramDto,
  ): Promise<Diagram> {
    return this.diagramService.createDiagram(req.user.id, projectId, dto)
  }

  @Patch(':projectId')
  updateProjectById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.updateProjectById(req.user.id, projectId, dto)
  }

  @Patch(':projectId/diagram/:diagramId')
  updatedDiagramById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('diagramId', ParseIntPipe) diagramId: number,
    @Body() dto: UpdateDiagramDto,
  ): Promise<Diagram> {
    return this.diagramService.updateDiagramById(req.user.id, projectId, diagramId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId')
  deleteProjectById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
  ): Promise<void> {
    return this.projectService.deleteProjectById(req.user.id, projectId)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId/member')
  deleteProjectMemberByEmail(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: DeleteProjectMemberDto,
  ): Promise<void> {
    return this.projectService.deleteProjectMemberByEmail(req.user.id, projectId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':projectId/diagram/:diagramId')
  deleteDiagramById(
    @Req() req: Request,
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('diagramId', ParseIntPipe) diagramId: number,
  ): Promise<void> {
    return this.diagramService.deleteDiagramById(req.user.id, projectId, diagramId)
  }
}
