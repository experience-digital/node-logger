"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async captureException(dsn, language, log) {
        if (language === 'node') {
            const Sentry = await Promise.resolve().then(() => __importStar(require('@sentry/node')));
            Sentry.init({
                dsn: dsn,
                // Set tracesSampleRate to 1.0 to capture 100%
                // of transactions for performance monitoring.
                // We recommend adjusting this value in production
                tracesSampleRate: 1.0,
            });
        }
        else if (language === 'js') {
            const { Integrations } = await Promise.resolve().then(() => __importStar(require("@sentry/tracing")));
            const Sentry = await Promise.resolve().then(() => __importStar(require('@sentry/browser')));
            Sentry.init({
                dsn: dsn,
                integrations: [new Integrations.BrowserTracing()],
                // Set tracesSampleRate to 1.0 to capture 100%
                // of transactions for performance monitoring.
                // We recommend adjusting this value in production
                tracesSampleRate: 1.0,
            });
        }
    },
    log(dsn, language, log) {
        this.captureException(dsn, language, log);
    },
};
