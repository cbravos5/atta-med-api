import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  //#region Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //#endregion

  //#region Swagger
  const config = new DocumentBuilder()
    .setTitle('Atta Med')
    .setDescription('Atta Med API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //#endregion

  await app.listen(process.env.PORT || 3001);
}

bootstrap();
