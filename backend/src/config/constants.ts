// backend/src/config/constants.ts
export const ROLES = {
    ADMIN: 'ADMIN',
    ORGANIZER: 'ORGANIZER',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];