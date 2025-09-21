# server/Dockerfile

# ------------------ STAGE 1: 의존성 설치 및 빌드 ------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# 소스 코드 복사
COPY . .

# TypeScript 코드를 JavaScript로 컴파일
RUN npm run build


# ------------------ STAGE 2: 프로덕션 환경 ------------------
FROM node:18-alpine

WORKDIR /app
# 3. (중요) 프로덕션용 node_modules만 다시 설치
# 최종 이미지에는 불필요한 devDependencies를 제외하기 위해
# package.json을 먼저 복사하고 --only=production으로 재설치합니다.
COPY package*.json ./
RUN npm install --only=production

# 빌드 스테이지에서 컴파일된 코드만 복사
COPY --from=builder /app/dist ./dist

# 서버는 3001번 포트를 사용
EXPOSE 3001

# 컨테이너 시작 시 컴파일된 JavaScript 파일 실행
CMD ["node", "dist/index.js"]