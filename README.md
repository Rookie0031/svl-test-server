# 🎓 NestJS Swagger API 문서화 강의

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 📚 강의 개요

이 프로젝트는 **NestJS**와 **Swagger**를 사용한 API 문서화 방법을 학습하기 위한 실습용 예제입니다. 초보 개발자들이 단계별로 API 문서화의 핵심 개념을 이해하고 실습할 수 있도록 구성되었습니다.

## 🎯 학습 목표

- ✅ **NestJS 프레임워크** 이해 및 활용
- ✅ **Swagger/OpenAPI 3.0**을 통한 API 문서화
- ✅ **DTO(Data Transfer Object)** 설계 및 검증
- ✅ **RESTful API** 설계 패턴 학습
- ✅ **에러 처리** 및 응답 표준화
- ✅ **페이지네이션** 및 **검색 기능** 구현

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

## 📝 실습 과제

### 초급 과제
1. **새로운 API 추가**: 현재 시간을 반환하는 `/time` API 구현
2. **DTO 확장**: 사용자 DTO에 전화번호 필드 추가
3. **검증 규칙 추가**: 이메일 형식 검증 강화

### 중급 과제
1. **새로운 도메인 추가**: 게시글(Post) CRUD API 구현
2. **관계 설정**: 사용자와 게시글 간의 관계 설정
3. **고급 검색**: 제목, 내용, 작성자별 게시글 검색

### 고급 과제
1. **인증/인가**: JWT 토큰 기반 인증 시스템 구현
2. **파일 업로드**: 사용자 프로필 이미지 업로드 API
3. **실시간 알림**: WebSocket을 활용한 실시간 알림 시스템

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

## 🤝 기여하기

이 강의 자료를 개선하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍🏫 강사 정보

- **이름**: 강사
- **이메일**: instructor@example.com
- **웹사이트**: https://example.com

---

**💡 팁**: Swagger UI에서 "Try it out" 버튼을 클릭하여 API를 직접 테스트해보세요! 실제 요청과 응답을 확인하면서 API 동작을 이해할 수 있습니다.
