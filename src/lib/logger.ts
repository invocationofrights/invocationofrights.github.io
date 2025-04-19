// ---------------------------------------------
// File: src/lib/logger.ts
// ---------------------------------------------
/**
 * Tiny structured logger.
 *  –In development: pretty‑prints in the browser / Node console.
 *  –In production: emits JSON lines (good for Logflare, Datadog, etc.).
 *
 * Usage:
 *   import logger from '@/lib/logger';
 *   logger.info('User signed up', { id, email });
 *   logger.error('Stripe failure', { err });
 */
type Level = 'debug' | 'info' | 'warn' | 'error';

function log(level: Level, msg: string, meta: Record<string, unknown> = {}) {
  const entry = {
    level,
    msg,
    ...meta,
    t: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'production') {
    // JSON line – great for ingestion pipelines
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(entry));
  } else {
    // Dev‑friendly: colourised + inline meta inspection
    const colour =
      level === 'error'
        ? 'color:red'
        : level === 'warn'
          ? 'color:orange'
          : 'color:magenta';

    // eslint-disable-next-line no-console
    console.log(`%c[${level.toUpperCase()}]`, colour, msg, meta);
  }
}

const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => log('debug', msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => log('info', msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => log('warn', msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => log('error', msg, meta),
};

export default logger;
