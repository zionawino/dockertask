import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static assets (CSS, JS, etc.)
  app.useStaticAssets(path.join(__dirname, '..', 'public'));

  // Set the views directory
  app.setBaseViewsDir(path.join(__dirname, '..', 'views'));

  // Set EJS as the view engine
  app.setViewEngine('ejs');

  await app.listen(3002);
  console.log(`Application is running on: http://localhost:3002`);
}

bootstrap();
