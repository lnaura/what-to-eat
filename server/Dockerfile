# server/Dockerfile

# ------------------ STAGE 1: 의존성 설치 및 빌드 ------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# 프로덕션용 의존성만 설치
RUN npm install --only=production

# 소스 코드 복사
COPY . .

# TypeScript 코드를 JavaScript로 컴파일
RUN npm run build


# ------------------ STAGE 2: 프로덕션 환경 ------------------
FROM node:18-alpine

WORKDIR /app

# 빌드 스테이지에서 설치된 node_modules와 컴파일된 코드만 복사
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# 서버는 3001번 포트를 사용
EXPOSE 3001

# 컨테이너 시작 시 컴파일된 JavaScript 파일 실행
CMD ["node", "dist/index.js"]