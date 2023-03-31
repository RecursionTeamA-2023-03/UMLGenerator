import { Module } from '@nestjs/common'
import { DiagramController } from './diagram.controller'
import { DiagramService } from './diagram.service'

@Module({
  controllers: [DiagramController],
  providers: [DiagramService],
})
export class DiagramModule {}
