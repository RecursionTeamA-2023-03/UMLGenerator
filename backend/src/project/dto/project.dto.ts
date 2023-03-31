import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class CreateProjectMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class DeleteProjectMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
