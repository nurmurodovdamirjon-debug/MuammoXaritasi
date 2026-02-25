const isDev = import.meta.env.DEV

export const logger = {
  log: (...args: unknown[]) => isDev && console.log('[App]', ...args),
  error: (...args: unknown[]) => isDev && console.error('[Error]', ...args),
  warn: (...args: unknown[]) => isDev && console.warn('[Warn]', ...args),
}
