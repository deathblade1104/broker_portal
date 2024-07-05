import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors';
import { setupSwagger } from './common/middlewares/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('server.port') || 3001;
  app.setGlobalPrefix('api');
  patchNestJsSwagger();
  setupSwagger(app);
  //app.useGlobalFilters(new ZodFilter(), new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();
  const logger = new Logger('AppBootstrap');
  await app.listen(port);
  logger.log(
    `We-Brokered BE Microservice Application is running on: ${await app.getUrl()}/api`,
  );
}

bootstrap().catch(err => {
  // writeFileSync("./nest-devtools-graph.json", PartialGraphHost.toString() ?? "");
  // process.exit(1);
  console.error(err);
});
