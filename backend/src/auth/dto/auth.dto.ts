import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string
}
