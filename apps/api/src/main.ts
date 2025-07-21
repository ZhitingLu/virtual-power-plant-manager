import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;
  const corsOrigin = config.get<string>('CORS_ORIGIN') || 'http://localhost:3001';

  app.enableCors({
    origin: corsOrigin,
  });

  await app.listen(port);
  new Logger('Bootstrap').log(`API server running on http://localhost:${port}`);
}
bootstrap();