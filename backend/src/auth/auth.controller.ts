import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req, Get } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { SignUpDto, LoginDto } from './dto/auth.dto'
import { Csrf, Msg } from './interfaces/auth.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() }
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto): Promise<Msg> {
    return this.authService.signUp(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<Msg> {
    const jwt = await this.authService.login(dto)
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, // if https connection then true
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'ok',
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false, // if https connection then true
      sameSite: 'none',
      path: '/',
    })
    return {
      message: 'ok',
    }
  }
}
