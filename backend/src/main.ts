import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { Request } from 'express'
import * as cookieParser from 'cookie-parser'
import * as csurf from 'csurf'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', process.env.FRONTEND_URL],
  })
  app.use(cookieParser())
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: false, // if https connection then true
      },
      value: (req: Request) => {
        console.log(req.headers)
        return req.header('csrf-token')
      },
    }),
  )
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
