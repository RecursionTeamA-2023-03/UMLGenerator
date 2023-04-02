import { Module } from '@nestjs/common'
import { DiagramService } from './diagram.service'
import { ProjectModule } from '../project/project.module'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule, ProjectModule],
  exports: [DiagramService],
  providers: [DiagramService],
})
export class DiagramModule {}
