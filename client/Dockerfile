# client/Dockerfile

# ------------------ STAGE 1: 빌드 환경 ------------------
# Node.js 이미지를 기반으로 빌드 환경을 설정합니다.
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 전체 복사
COPY . .

# React 앱 빌드
RUN npm run build


# ------------------ STAGE 2: 프로덕션 환경 ------------------
# 가벼운 Nginx 이미지를 기반으로 최종 이미지를 만듭니다.
FROM nginx:1.25-alpine

# builder 스테이지에서 빌드된 정적 파일들을 Nginx의 기본 웹 루트로 복사
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx가 80번 포트를 사용하도록 설정
EXPOSE 80

# 컨테이너가 시작될 때 Nginx를 실행
CMD ["nginx", "-g", "daemon off;"]