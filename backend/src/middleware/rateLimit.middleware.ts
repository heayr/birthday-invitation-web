import rateLimit from 'express-rate-limit';

const defaultMessage = 'Слишком много запросов. Попробуйте позже.';

const numberOrDefault = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const createJsonHandler = (message: string) => {
  return (_req: any, res: any) => {
    res.status(429).json({ success: false, message });
  };
};

const createLimiter = (opts: {
  windowMs: number;
  limit: number;
  message?: string;
}) => {
  return rateLimit({
    windowMs: opts.windowMs,
    limit: opts.limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    // Считаем запросы по IP (req.ip корректно работает после app.set('trust proxy', ...))
    keyGenerator: (req) => req.ip ?? req.socket?.remoteAddress ?? 'unknown',
    handler: createJsonHandler(opts.message ?? defaultMessage),
  });
};

// Defaults под небольшой проект. Можно легко заменить через env переменные.
const WINDOW_10_MIN = 10 * 60 * 1000;
const WINDOW_1_HOUR = 60 * 60 * 1000;
const WINDOW_15_MIN = 15 * 60 * 1000;

export const createRsvpLimiter = createLimiter({
  windowMs: numberOrDefault(process.env.RATE_LIMIT_CREATE_WINDOW_MS, WINDOW_10_MIN),
  limit: numberOrDefault(process.env.RATE_LIMIT_CREATE_LIMIT, 10),
});

export const updateRsvpLimiter = createLimiter({
  windowMs: numberOrDefault(process.env.RATE_LIMIT_UPDATE_WINDOW_MS, WINDOW_10_MIN),
  limit: numberOrDefault(process.env.RATE_LIMIT_UPDATE_LIMIT, 10),
});

export const getRsvpLimiter = createLimiter({
  windowMs: numberOrDefault(process.env.RATE_LIMIT_GET_WINDOW_MS, WINDOW_1_HOUR),
  limit: numberOrDefault(process.env.RATE_LIMIT_GET_LIMIT, 60),
});

export const adminAllLimiter = createLimiter({
  windowMs: numberOrDefault(process.env.RATE_LIMIT_ADMIN_WINDOW_MS, WINDOW_15_MIN),
  limit: numberOrDefault(process.env.RATE_LIMIT_ADMIN_LIMIT, 30),
  message: 'Слишком много попыток к админке. Попробуйте позже.',
});

