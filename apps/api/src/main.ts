import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  
  // Enable CORS for our Next.js frontend (adjust in production)
  app.enableCors({
    origin: 'http://localhost:3001', 
  });
  
  await app.listen(port);
  new Logger('Bootstrap').log(`API server running on http://localhost:${port}`);
}
bootstrap();