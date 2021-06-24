"use strict";
exports.__esModule = true;
var Sentry = require("@sentry/node");
exports["default"] = {
    captureException: function (dsn, language, log) {
        if (language === 'node') {
            Sentry.init({
                // dsn: "https://8b86687cbf9644ef8a028d3853c684e9@o109215.ingest.sentry.io/5831479",
                dsn: dsn,
                // Set tracesSampleRate to 1.0 to capture 100%
                // of transactions for performance monitoring.
                // We recommend adjusting this value in production
                tracesSampleRate: 1.0
            });
            Sentry.captureException(log);
        }
    },
    log: function (dsn, language, log) {
        this.captureException(dsn, language, log);
    }
};
