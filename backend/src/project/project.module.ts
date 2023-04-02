import { Module, forwardRef } from '@nestjs/common'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { DiagramModule } from '../diagram/diagram.module'

@Module({
  imports: [PrismaModule, forwardRef(() => DiagramModule)],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
