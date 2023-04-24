import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //#region Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //#endregion

  //#region Swagger
  const config = new DocumentBuilder()
    .setTitle('Atta Med')
    .setDescription('Atta Med API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //#endregion

  await app.listen(3000);
}

bootstrap();
