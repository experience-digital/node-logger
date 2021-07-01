export default {
  async captureException(dsn, language, log) {
    if (language === 'node') {
      const Sentry =  await import('@sentry/node')
      Sentry.init({
        dsn: dsn,
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      })
      Sentry.captureException(log)
      return true
    } else if (language === 'js') {
      const { Integrations } = await import("@sentry/tracing");
      const Sentry =  await import('@sentry/browser')
      Sentry.init({
        dsn: dsn,
        integrations: [new Integrations.BrowserTracing()],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      })
      Sentry.captureException(log)
      return true
    }
    
  },

  log(dsn, language, log) {
    this.captureException(dsn, language, log)
  },
}
