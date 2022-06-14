import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Platform Games')
    .setDescription('Aplicação para gestão jogos de uma plataforma.')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('user')
    .addTag('game')
    .addTag('genre')
    .addTag('profile')
    .addTag('profile-game')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
