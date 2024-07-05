import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { setupSwagger } from './swagger.config';

describe('Swagger', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // ...
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('setupSwagger', () => {
    it('should setup swagger correctly', () => {
      const options = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Raven Ops API documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

      const setupSpy = jest.spyOn(SwaggerModule, 'setup');

      setupSwagger(app);

      expect(setupSpy).toHaveBeenCalledWith(
        'apis',
        app,
        SwaggerModule.createDocument(app, options),
      );
    });
  });
});
