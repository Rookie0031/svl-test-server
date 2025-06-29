import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // 전역 ValidationPipe 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // 전역 Logging Interceptor 설정
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger 강의용 API')
    .setDescription(`
      ## 🎓 NestJS Swagger API 문서화 강의용 예제

      이 API는 NestJS와 Swagger를 사용한 API 문서화 방법을 보여주는 예제입니다.

      ### 📚 학습 목표
      - NestJS 프레임워크 이해
      - Swagger를 통한 API 문서화
      - DTO를 활용한 데이터 검증
      - RESTful API 설계 패턴
      - 에러 처리 및 응답 표준화

      ### 🛠️ 주요 기능
      - **기본 API**: Hello World, 헬스 체크, 시스템 정보
      - **사용자 관리**: CRUD 작업 (생성, 조회, 수정, 삭제)
      - **페이지네이션**: 대용량 데이터 처리
      - **검색 및 필터링**: 사용자 검색 기능
      - **다국어 지원**: 한국어, 영어, 일본어 인사말

      ### 📖 사용 방법
      1. 각 API 엔드포인트를 클릭하여 상세 정보 확인
      2. "Try it out" 버튼을 클릭하여 실제 API 테스트
      3. 요청 파라미터와 응답 스키마 확인
      4. 에러 케이스와 성공 케이스 모두 테스트

      ### 🔧 기술 스택
      - **Backend**: NestJS, TypeScript
      - **Documentation**: Swagger/OpenAPI 3.0
      - **Validation**: class-validator, class-transformer
      - **Testing**: Jest, Supertest
    `)
    .setVersion('1.0.0')
    .addTag('default', '기본 API - Hello World, 헬스 체크, 시스템 정보')
    .addTag('users', '사용자 관리 API - CRUD 작업, 페이지네이션, 검색')
    .addServer('http://localhost:3000', '개발 서버')
    .addServer('https://api.example.com', '프로덕션 서버')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Swagger UI 설정
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activate: true,
        theme: 'monokai'
      }
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #3b4151; font-size: 36px; }
      .swagger-ui .info .description { font-size: 14px; line-height: 1.5; }
      .swagger-ui .scheme-container { margin: 0 0 20px; padding: 20px; background: #f7f7f7; }
    `,
    customSiteTitle: 'NestJS Swagger 강의용 API 문서'
  });

  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`
    🚀 NestJS Swagger 강의용 API 서버가 시작되었습니다!
    
    📖 API 문서: http://localhost:3000/api
    🔧 개발 서버: http://localhost:3000
    
    📚 학습 가이드:
    - 기본 API: GET /, GET /hello, GET /health, GET /system
    - 사용자 관리: POST /users, GET /users, GET /users/:id, PUT /users/:id, DELETE /users/:id
    
    💡 팁: Swagger UI에서 "Try it out" 버튼을 클릭하여 API를 직접 테스트해보세요!
  `);
}
bootstrap();
