# NestJS 애플리케이션을 위한 간단한 Dockerfile
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 애플리케이션 시작
CMD ["node", "dist/main.js"]