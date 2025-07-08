# 🎓 NestJS Swagger API

## 🛠️ 주요 기능

### 📋 기본 API
- **Hello World**: 기본 인사말 API
- **개인화된 인사말**: 사용자 이름과 언어별 인사말
- **헬스 체크**: 서비스 상태 확인
- **시스템 정보**: 애플리케이션 정보 조회

### 👥 사용자 관리 API
- **사용자 생성** (POST /users)
- **사용자 목록 조회** (GET /users) - 페이지네이션, 검색, 필터링
- **사용자 상세 조회** (GET /users/:id)
- **사용자 정보 수정** (PUT /users/:id)
- **사용자 삭제** (DELETE /users/:id)

## 🚀 시작하기

### 1. 프로젝트 설치

```bash
# 의존성 설치
npm install
```

### 2. 개발 서버 실행

```bash
# 개발 모드 (핫 리로드)
npm run start:dev
```

### 3. API 문서 확인

브라우저에서 [http://localhost:3000/api](http://localhost:3000/api) 접속

## 📖 강의 진행 순서

### 1단계: 기본 설정 이해
- [ ] NestJS 프로젝트 구조 파악
- [ ] Swagger 설정 방법 학습
- [ ] ValidationPipe 설정 이해

### 2단계: DTO 설계
- [ ] `src/dto/common.dto.ts` - 공통 응답 DTO
- [ ] `src/dto/hello.dto.ts` - Hello API DTO
- [ ] `src/dto/user.dto.ts` - 사용자 관리 DTO

### 3단계: 서비스 로직 구현
- [ ] `src/app.service.ts` - 기본 API 서비스
- [ ] `src/services/user.service.ts` - 사용자 관리 서비스

### 4단계: 컨트롤러 구현
- [ ] `src/app.controller.ts` - 기본 API 컨트롤러
- [ ] `src/controllers/user.controller.ts` - 사용자 관리 컨트롤러

### 5단계: Swagger 데코레이터 활용
- [ ] `@ApiTags()` - API 그룹화
- [ ] `@ApiOperation()` - API 설명
- [ ] `@ApiResponse()` - 응답 스키마 정의
- [ ] `@ApiBody()`, `@ApiQuery()`, `@ApiParam()` - 요청 파라미터 정의

## 🔧 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| **NestJS** | 11.0.1 | Node.js 백엔드 프레임워크 |
| **TypeScript** | 5.7.3 | 정적 타입 지원 |
| **Swagger** | 7.3.0 | API 문서화 |
| **class-validator** | 0.14.0 | 데이터 검증 |
| **Jest** | 29.7.0 | 테스팅 프레임워크 |
| **Docker** | latest | 컨테이너화 및 배포 |

## 📋 API 엔드포인트

### 기본 API
| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/` | Hello World 메시지 |
| `GET` | `/hello` | 개인화된 인사말 |
| `GET` | `/health` | 서비스 헬스 체크 |
| `GET` | `/system` | 시스템 정보 |

### 사용자 관리 API
| 메서드 | 경로 | 설명 |
|--------|------|------|
| `POST` | `/users` | 사용자 생성 |
| `GET` | `/users` | 사용자 목록 조회 |
| `GET` | `/users/:id` | 사용자 상세 조회 |
| `PUT` | `/users/:id` | 사용자 정보 수정 |
| `DELETE` | `/users/:id` | 사용자 삭제 |

## 🧪 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

## 🐳 Docker 배포

### 로컬 Docker 실행

```bash
# Docker 이미지 빌드
docker build -t sample-nest-server .

# 컨테이너 실행
docker run -p 3000:3000 sample-nest-server

# Docker Compose 실행
docker-compose up -d
```

### Docker Hub 배포

**저장소**: `rookie0031/sample-nest-server`

자세한 Docker 배포 가이드는 [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)를 참조하세요.

#### 빠른 배포
```bash
# 자동화 스크립트 실행
./deploy-multiplatform.sh

# 또는 수동 배포
docker buildx build --platform linux/amd64,linux/arm64 \
  -t rookie0031/sample-nest-server:latest --push .
```

#### 멀티 플랫폼 빌드 (AMD64 + ARM64)

```bash
# Buildx 설정
docker buildx create --name multiplatform-builder --use

# 멀티 플랫폼 빌드 및 푸시
docker buildx build --platform linux/amd64,linux/arm64 \
  -t rookie0031/sample-nest-server:latest --push .
```

### 주요 특징

- ✅ **멀티 스테이지 빌드**: 최적화된 이미지 크기
- ✅ **멀티 플랫폼 지원**: AMD64, ARM64 아키텍처
- ✅ **보안 강화**: Non-root 사용자 실행
- ✅ **헬스체크**: 컨테이너 상태 모니터링
- ✅ **로깅**: 구조화된 애플리케이션 로그

## 🎨 Swagger UI 커스터마이징

프로젝트에서는 Swagger UI를 다음과 같이 커스터마이징했습니다:

- **테마**: Monokai 문법 하이라이팅
- **레이아웃**: 상단바 제거, 깔끔한 디자인
- **기능**: 필터링, 요청 시간 표시, 권한 유지

## 📚 추가 학습 자료

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [Swagger 공식 문서](https://swagger.io/docs/)
- [OpenAPI 3.0 스펙](https://swagger.io/specification/)
- [class-validator 문서](https://github.com/typestack/class-validator)

---

**💡 팁**: Swagger UI에서 "Try it out" 버튼을 클릭하여 API를 직접 테스트해보세요! 실제 요청과 응답을 확인하면서 API 동작을 이해할 수 있습니다.
