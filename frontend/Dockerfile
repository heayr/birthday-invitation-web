# ---------- FRONTEND DOCKERFILE ----------
FROM node:20-bullseye AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем все исходники
COPY . .

# Собираем проект Vite
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL:-/api}

RUN npm run build

# ---------- RUNTIME ----------
FROM node:20-bullseye

WORKDIR /app

# Устанавливаем serve для отдачи фронтенда
RUN npm install -g serve

# Копируем сборку
COPY --from=builder /app/dist ./dist

EXPOSE 80

# Запуск фронтенда
CMD ["serve", "-s", "dist", "-l", "80"]