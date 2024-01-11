import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';
import { IConfig } from 'src/interfaces/config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService<IConfig>);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Weather Map App')
    .setDescription('Weather Map App for test')
    .setVersion(process.env.npm_package_version || '')
    .addBearerAuth();

  const swaggerServerUrl = configService.get('SWAGGER_SERVER_URL', {
    infer: true,
  });

  if (swaggerServerUrl) {
    swaggerConfig.addServer(swaggerServerUrl);
  }

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig.build(),
  );

  SwaggerModule.setup(
    configService.get('SWAGGER_ENDPOINT') || 'api',
    app,
    swaggerDocument,
  );

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      transform: true,
      transformOptions: { exposeDefaultValues: true },
    }),
  );

  await app.listen(
    configService.get('PORT', { infer: true }) || 5001,
    configService.get('HOST', { infer: true }),
  );
}

(async () => {
  await bootstrap();
})();
