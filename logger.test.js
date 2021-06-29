var Log = require("./build/logger");

test('runs node logger and sends "node test" to sentry', () => {
  Log.default.log("https://8b86687cbf9644ef8a028d3853c684e9@o109215.ingest.sentry.io/5831479", 'node', 'node test')
})

test('runs js logger and sends "js test" to sentry', () => {
  Log.default.log("https://730f4cc255df4fb5809d64290adbfd55@o109215.ingest.sentry.io/5833138", 'js', 'js test')
})