import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
  .setTitle('Course regarding NetJS')
  .setDescription("This is first course of NestJS")
  .setVersion("1.0.0")
  .addTag('ssokol')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //use pipes globally
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));
}

bootstrap();
