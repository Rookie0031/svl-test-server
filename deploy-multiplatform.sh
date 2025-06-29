#!/bin/bash

# =============================================================================
# 멀티 플랫폼 Docker 배포 스크립트 (AMD64 + ARM64)
# =============================================================================

set -e  # 오류 발생시 스크립트 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 설정 변수 (여기를 수정하세요)
DOCKER_USERNAME="${DOCKER_USERNAME:-rookie0031}"
IMAGE_NAME="${IMAGE_NAME:-sample-nest-server}"
VERSION="${VERSION:-v1.0.0}"
PLATFORMS="${PLATFORMS:-linux/amd64,linux/arm64}"
BUILDER_NAME="multiplatform-builder"

# 도움말 함수
show_help() {
    echo "사용법: $0 [옵션]"
    echo ""
    echo "옵션:"
    echo "  -u, --username USERNAME    Docker Hub 사용자명"
    echo "  -i, --image IMAGE_NAME     이미지 이름"
    echo "  -v, --version VERSION      이미지 버전"
    echo "  -p, --platforms PLATFORMS  대상 플랫폼 (기본: linux/amd64,linux/arm64)"
    echo "  -h, --help                 이 도움말 표시"
    echo ""
    echo "예시:"
    echo "  $0 -u myusername -i myapp -v v2.0.0"
    echo "  $0 --username=john --image=nestjs-api --version=latest"
}

# 명령행 인수 처리
while [[ $# -gt 0 ]]; do
    case $1 in
        -u|--username)
            DOCKER_USERNAME="$2"
            shift 2
            ;;
        -i|--image)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -v|--version)
            VERSION="$2"
            shift 2
            ;;
        -p|--platforms)
            PLATFORMS="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}오류: 알 수 없는 옵션 $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# 필수 변수 확인
if [[ "$DOCKER_USERNAME" == "rookie0031" ]] && [[ -z "$FORCE_DEFAULT" ]]; then
    echo -e "${YELLOW}⚠️  기본 설정을 사용합니다: ${DOCKER_USERNAME}/${IMAGE_NAME}${NC}"
    echo "다른 사용자명을 원한다면: $0 -u your-username"
fi

# 로깅 함수
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 전체 이미지 태그
FULL_IMAGE_NAME="${DOCKER_USERNAME}/${IMAGE_NAME}"

echo "======================================"
echo "🚀 멀티 플랫폼 Docker 배포 시작"
echo "======================================"
echo "Docker Hub 사용자: ${DOCKER_USERNAME}"
echo "이미지 이름: ${IMAGE_NAME}"
echo "버전: ${VERSION}"
echo "플랫폼: ${PLATFORMS}"
echo "전체 이미지 태그: ${FULL_IMAGE_NAME}"
echo "======================================"

# Docker 로그인 확인
log_info "Docker 로그인 상태 확인..."
if ! docker info > /dev/null 2>&1; then
    log_error "Docker가 실행되지 않았습니다. Docker를 시작해주세요."
    exit 1
fi

# Docker Hub 로그인 확인
log_info "Docker Hub 인증 확인..."
if ! docker pull hello-world > /dev/null 2>&1; then
    log_warning "Docker Hub 로그인이 필요합니다."
    docker login
fi

# Buildx 설정
log_info "Docker Buildx 설정 중..."

# 기존 빌더가 있는지 확인
if docker buildx inspect "$BUILDER_NAME" > /dev/null 2>&1; then
    log_info "기존 빌더 '$BUILDER_NAME' 사용"
    docker buildx use "$BUILDER_NAME"
else
    log_info "새로운 빌더 '$BUILDER_NAME' 생성"
    docker buildx create --name "$BUILDER_NAME" --use
fi

# 빌더 부트스트랩
log_info "빌더 부트스트랩 중..."
docker buildx inspect --bootstrap

# Dockerfile 존재 확인
if [[ ! -f "Dockerfile" ]]; then
    log_error "Dockerfile을 찾을 수 없습니다."
    exit 1
fi

# 빌드 및 푸시 시작
log_info "멀티 플랫폼 이미지 빌드 및 푸시 시작..."

# 빌드 명령어 실행
if docker buildx build \
    --platform "$PLATFORMS" \
    --tag "${FULL_IMAGE_NAME}:latest" \
    --tag "${FULL_IMAGE_NAME}:${VERSION}" \
    --push \
    --progress=plain \
    .; then
    
    log_success "빌드 및 푸시 완료!"
else
    log_error "빌드 및 푸시 실패"
    exit 1
fi

# 이미지 정보 확인
log_info "이미지 플랫폼 지원 확인..."
if command -v docker &> /dev/null && docker buildx imagetools inspect "${FULL_IMAGE_NAME}:latest" > /dev/null 2>&1; then
    echo ""
    echo "📋 이미지 플랫폼 정보:"
    docker buildx imagetools inspect "${FULL_IMAGE_NAME}:latest"
else
    log_warning "이미지 정보를 가져올 수 없습니다."
fi

# 배포 완료 메시지
echo ""
echo "======================================"
log_success "멀티 플랫폼 배포 완료!"
echo "======================================"
echo "🔗 Docker Hub: https://hub.docker.com/r/${DOCKER_USERNAME}/${IMAGE_NAME}"
echo "📦 이미지 태그:"
echo "   - ${FULL_IMAGE_NAME}:latest"
echo "   - ${FULL_IMAGE_NAME}:${VERSION}"
echo ""
echo "🚀 이미지 실행 방법:"
echo "   docker run -p 3000:3000 ${FULL_IMAGE_NAME}:latest"
echo ""
echo "🔍 플랫폼별 실행:"
echo "   # AMD64"
echo "   docker run --platform linux/amd64 -p 3000:3000 ${FULL_IMAGE_NAME}:latest"
echo "   # ARM64"  
echo "   docker run --platform linux/arm64 -p 3000:3000 ${FULL_IMAGE_NAME}:latest"
echo "======================================"