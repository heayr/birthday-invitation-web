# frontend/Dockerfile

# Этап сборки
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false
COPY . .
RUN npm run build

# Этап раздачи статики через nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Если у вас есть кастомный nginx.conf, скопируйте его (см. ниже)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]