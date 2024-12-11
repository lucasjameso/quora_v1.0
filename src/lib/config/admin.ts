import { validateEnvironment } from './validation';

const env = validateEnvironment();

export const adminConfig = {
  email: env.VITE_ADMIN_EMAIL,
  password: env.VITE_ADMIN_PASSWORD
};