import 'dotenv/config';

const env = (key, fallback = undefined) => process.env[key] ?? fallback;

export const config = {
  BOT_TOKEN: env('BOT_TOKEN'),
  WEBHOOK_URL: env('WEBHOOK_URL'),
  PORT: parseInt(env('PORT', '3000'), 10),
  DEFAULT_TASK_MODE: env('DEFAULT_TASK_MODE', 'daily'), // 'daily' | 'static'
  DEFAULT_STATIC_TASK_ID: env('DEFAULT_STATIC_TASK_ID', 'shift-1'),
  ACK_KEYWORDS: (env('ACK_KEYWORDS', 'ack,done,completed,finished,ok') || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean),
  SUMMARY_CRON: env('SUMMARY_CRON', ''),
  DATA_DIR: env('DATA_DIR', 'data'),
  MONGODB_URI: env('MONGODB_URI', '')
};

export const requireEnv = (keys = []) => {
  const missing = keys.filter(k => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required env: ${missing.join(', ')}`);
  }
};
