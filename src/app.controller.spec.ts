import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getPersonalizedHello', () => {
    it('should return personalized hello with name', () => {
      const result = appController.getPersonalizedHello({ name: '홍길동' });
      expect(result.message).toBe('안녕하세요, 홍길동님!');
      expect(result.timestamp).toBeDefined();
    });

    it('should return default hello without name', () => {
      const result = appController.getPersonalizedHello({});
      expect(result.message).toBe('안녕하세요, 손님님!');
      expect(result.timestamp).toBeDefined();
    });
  });
});
