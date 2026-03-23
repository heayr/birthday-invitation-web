# Этап 1: сборка React-приложения
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci

# Копируем исходный код и собираем приложение
COPY . .
RUN npm run build

# Этап 2: nginx для отдачи статики
FROM nginx:alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx (SPA-роутинг)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]