import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.number().optional().default(3000),
  NODE_ENV: z.string().optional().default('development'),
  DATABASE_URL: z.string(),
});
export type Env = z.infer<typeof envSchema>;
