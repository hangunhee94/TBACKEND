import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const configService: ConfigService = new ConfigService();

  const PORT = process.env.PORT || 80;

  const app = await NestFactory.create(AppModule, { cors: true });

  // global prefix uri 추가
  // app.setGlobalPrefix('tbalance');

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('AfreecaTV-membership')
    .setDescription('AfreecaTV-membership API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
        name: 'Authorization',
        in: 'Header',
      },
      'token',
    )
    .setVersion(configService.get<string>('VERSION'))
    .addTag('AfreecaTV-membership')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 글로벌 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      // 검증을 통과한 뒤, 대상 객체에서 검증 규칙이 정의되어있지 않은 프로퍼티를 모두 제거해주는 옵션
      whitelist: true,
      transform: true,
      // 대상 객체에 검증 규칙이 정의되어있지 않은 프로퍼티가 있으면 오류를 내게 하는 옵션
      forbidNonWhitelisted: true,
      // 프로퍼티에 검증 규칙이 정의되어있지 않은 클래스의 인스턴스나, plain object를 검증할 때 오류가 나게 만드는 옵션
      forbidUnknownValues: true,

      // 에러코드 노출 - 배포 단계에서 false 필요
      // disableErrorMessages: true,
    }),
  );

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: 'auto',
      },
    }),
  );
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
