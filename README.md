Одностраничное стильное приглашение на 50-летие.

## Стек

**Frontend**

- React 19 (RC) + Vite 8
- TypeScript
- Tailwind CSS 4
- React Hook Form + Zod
- lucide-react (иконки)

**Backend**

- Express + TypeScript
- Prisma + SQLite
- Zod для валидации

**Инфраструктура**

- Docker + docker-compose
- Traefik

Деплой

Собрать frontend: cd frontend && npm run build
Запустить через docker-compose:
docker-compose up -d --build

Поддомен: birthday.nologs.site (Traefik)

Структура проекта
birthday/
├── backend/ # Express + Prisma
├── frontend/ # Vite + React
├── docker-compose.yml
└── README.md
