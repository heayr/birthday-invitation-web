version: '3.8'

services:
backend:
build: ./backend
container_name: birthday-backend
restart: unless-stopped
environment:
- NODE_ENV=production
- ADMIN_PASSWORD=65ad65mi89n
volumes:
- ./backend/prisma:/app/prisma
- birthday-data:/app/prisma/dev.db
networks:
- traefik-net
labels:
- "traefik.enable=true"
- "traefik.http.routers.birthday-backend.rule=Host(`birthday.nologs.site`) && PathPrefix(`/api`)"
- "traefik.http.routers.birthday-backend.middlewares=birthday-backend-stripprefix"
- "traefik.http.middlewares.birthday-backend-stripprefix.stripprefix.prefixes=/api"
- "traefik.http.services.birthday-backend.loadbalancer.server.port=3001"

frontend:
build: ./frontend
container_name: birthday-frontend
restart: unless-stopped
networks:
- traefik-net
labels:
- "traefik.enable=true"
- "traefik.http.routers.birthday-frontend.rule=Host(`birthday.nologs.site`)"
- "traefik.http.services.birthday-frontend.loadbalancer.server.port=80"

volumes:
birthday-data:

networks:
traefik-net:
external: true