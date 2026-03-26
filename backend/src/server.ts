// /backend/types/server.ts 

// import express from 'express';
// import cors from 'cors';
// import rsvpRoutes from './routes';

// const app = express();

// app.use(cors({ origin: '*' })); // для dev; потом можно ограничить
// app.use(express.json());

// app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

// app.use('/rsvp', rsvpRoutes);

// app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
//   console.error(err);
//   res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
// });

// const PORT = Number(process.env.PORT) || 3001;
// app.listen(PORT, () => {
//   console.log(`Backend → http://localhost:${PORT}`);
//   console.log(`Админка будет доступна по /rsvp/admin/all (с Basic Auth)`);
// });


import express from 'express';
import cors from 'cors';
import rsvpRoutes from './routes';

const app = express();

// ✅ НОРМАЛЬНЫЙ CORS ДЛЯ ПРОДА
app.use(cors({
  origin: "https://birthday.nologs.site",
  methods: ["GET", "POST", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
}));

// ✅ важно для preflight
app.options('*', cors());

app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));

app.use('/rsvp', rsvpRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Backend → http://localhost:${PORT}`);
  console.log(`Админка будет доступна по /rsvp/admin/all (с Basic Auth)`);
});