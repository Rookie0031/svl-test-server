# 빌드 및 멀티 플랫폼 업로드 
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t rookie0031/sample-nest-server:latest --push .

# 실행
docker run -d -p 3000:3000 --name nest-app rookie0031/sample-nest-server:latest