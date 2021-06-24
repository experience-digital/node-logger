import * as Sentry from '@sentry/node'

export default {
  captureException(dsn, language, log) {
    if (language === 'node') {
      Sentry.init({
        // dsn: "https://8b86687cbf9644ef8a028d3853c684e9@o109215.ingest.sentry.io/5831479",
        dsn: dsn,

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
      })

      Sentry.captureException(log)
    }
  },

  log(dsn, language, log) {
    this.captureException(dsn, language, log)
  },
}
