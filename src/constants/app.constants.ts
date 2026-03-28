export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Mi App';

export const ROLES = {
  ADMIN: 'admin',
  USER:  'user',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE:     1,
  DEFAULT_PER_PAGE: 10,
} as const;