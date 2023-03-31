import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'

@Module({
  imports: [PrismaModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
