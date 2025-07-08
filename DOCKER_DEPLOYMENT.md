# 빌드 및 멀티 플랫폼 업로드 
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t rookie0031/sample-nest-server:latest --push .

# 실행
docker run -d -p 3000:3000 --name nest-app rookie0031/sample-nest-server:latest


# 기본 Hello World
curl -X GET http://localhost:3000/

# 개인화된 인사말 (한국어)
curl -X GET "http://localhost:3000/hello?name=홍길동&language=ko"

# 개인화된 인사말 (영어)
curl -X GET "http://localhost:3000/hello?name=John&language=en"

# 개인화된 인사말 (일본어)
curl -X GET "http://localhost:3000/hello?name=田中&language=ja"

curl -X GET http://localhost:3000/health

curl -X GET http://localhost:3000/system

# 기본 사용자 생성
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "김철수",
    "email": "kim@example.com",
    "password": "password123",
    "role": "user"
  }'

# 관리자 사용자 생성
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "관리자",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'

# 게스트 사용자 생성
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "손님",
    "email": "guest@example.com",
    "password": "guest123",
    "role": "guest"
  }'