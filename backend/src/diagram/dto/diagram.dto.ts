import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDiagramDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  content?: string
}

export class UpdateDiagramDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  content?: string
}
