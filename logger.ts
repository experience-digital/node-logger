// import * as Sentry from '@sentry/node'
// import * as Sentry from "@sentry/browser";
// import * as Tracing from '@sentry/tracing'

export default {
  async captureException(dsn, language, log) {
    if (language === 'node') {
      import('@sentry/node')
        .then(Sentry => {
          Sentry.init({
            dsn: dsn,

            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: 1.0,
          })
          console.log(log)
          Sentry.captureException(log)
        })
        .catch(err => {
          console.error(err)
        })

    // } else if (language === 'vue') {
    //   // const Vue = await import('vue')
    //   import('@sentry/vue')
    //     .then(Sentry => {
    //       Sentry.init({
    //         dsn: dsn,
          
    //         tracesSampleRate: 1.0,
    //       })
    //       console.log(log)
    //       myUndefinedFunction();
    //       // Sentry.captureException(log)
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })

    } else if (language === 'js') {
      // const Sentry = await import('@sentry/browser')
      import('@sentry/browser')
        .then(Sentry => {
          Sentry.init({
            dsn: dsn,
            // integrations: [new Tracing.Integrations.BrowserTracing()],
            tracesSampleRate: 1.0,
          })
          console.log(log)
          try {
            Sentry.captureMessage(log)
            /* @ts-ignore */
            myUndefinedJSFunction();
          } catch (err) {
            console.log(err)
            Sentry.captureException(err)
          }
        })

      // try {
      //   Sentry.captureMessage("Something went wrong");

      //   /* @ts-ignore */
      //   aFunctionThatMightFail();
      // } catch (err) {
      //   Sentry.captureException(err);
      // }
    }
  },

  log(dsn, language, log) {
    this.captureException(dsn, language, log)
  },
}
