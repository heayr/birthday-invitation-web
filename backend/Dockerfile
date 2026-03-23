# version: '3.8'

# services:
# backend:
# build: ./backend
# container_name: birthday-backend
# restart: unless-stopped
# environment:
# - NODE_ENV=production
# - ADMIN_PASSWORD=65ad65mi89n
# volumes:
# - ./backend/prisma:/app/prisma
# - birthday-data:/app/prisma/dev.db
# networks:
# - proxy
# labels:
# - "traefik.enable=true"
# - "traefik.http.routers.birthday-backend.rule=Host(`birthday.nologs.site`) && PathPrefix(`/api`)"
# - "traefik.http.routers.birthday-backend.middlewares=birthday-backend-stripprefix"
# - "traefik.http.middlewares.birthday-backend-stripprefix.stripprefix.prefixes=/api"
# - "traefik.http.services.birthday-backend.loadbalancer.server.port=3001"

# frontend:
# build: ./frontend
# container_name: birthday-frontend
# restart: unless-stopped
# networks:
# - proxy
# labels:
# - "traefik.enable=true"
# - "traefik.http.routers.birthday-frontend.rule=Host(`birthday.nologs.site`)"
# - "traefik.http.services.birthday-frontend.loadbalancer.server.port=80"

# volumes:
# birthday-data:

# networks:
# proxy:
# external: true


# Базовый образ для сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем исходный код и генерируем Prisma Client
COPY . .
RUN npx prisma generate

# Сборка TypeScript (если используете)
RUN npm run build

# Финальный образ
FROM node:20-alpine

WORKDIR /app

# Устанавливаем production-зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем собранные файлы и Prisma схему
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Открываем порт приложения
EXPOSE 3001

# Запуск (путь к собранному файлу, например, dist/index.js)
CMD ["node", "dist/index.js"]