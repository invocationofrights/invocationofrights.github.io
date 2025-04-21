// ---------------------------------------------
// File: src/lib/logger.ts
// ---------------------------------------------
/**
 * Tiny structured logger.
 *  –Dev  : pretty‑prints in the browser / Node console.
 *  -Prod : emits JSON lines (good for Logflare, Datadog, etc.).
 *
 * Usage:
 *   logger.info('User signed up', { id, email });
 *   logger.error('Stripe failure', new Error('card_declined'));
 *   logger.warn('Copy failed', err, { route: '/how‑to' });
 */

type Level = 'debug' | 'info' | 'warn' | 'error';
type Meta  = Record<string, unknown>;

/** Flattens Error → { name, message, stack, …ownProps }  — TS‑safe */
function serialiseError(err: Error): Meta {
  const base = { name: err.name, message: err.message, stack: err.stack };

  // copy any enumerable custom props (e.g. err.code)
  const extras: Meta = {};
  for (const key of Object.keys(err)) {
    extras[key] = (err as never)[key];
  }
  return { ...base, ...extras };
}

function log(level: Level, msg: string, errOrMeta: unknown = {}, maybeMeta: Meta = {}) {
  const meta: Meta =
    errOrMeta instanceof Error
      ? { err: serialiseError(errOrMeta), ...maybeMeta }
      : { ...(errOrMeta as Meta), ...maybeMeta };

  const entry = { level, msg, ...meta, t: new Date().toISOString() };

  if (process.env.NODE_ENV === 'production') {
    // JSON line – great for ingestion pipelines
    console.log(JSON.stringify(entry));
  } else {
    const colour =
      level === 'error' ? 'color:red'
        : level === 'warn'  ? 'color:orange'
          : level === 'info'  ? 'color:blue'
            :                     'color:magenta';

    console.log(`%c[${level.toUpperCase()}]`, colour, msg, meta);
  }
}

const logger = {
  debug: (msg: string, errOrMeta?: unknown, meta?: Meta) => log('debug', msg, errOrMeta, meta),
  info : (msg: string, errOrMeta?: unknown, meta?: Meta) => log('info' , msg, errOrMeta, meta),
  warn : (msg: string, errOrMeta?: unknown, meta?: Meta) => log('warn' , msg, errOrMeta, meta),
  error: (msg: string, errOrMeta?: unknown, meta?: Meta) => log('error', msg, errOrMeta, meta),
};

export default logger;
