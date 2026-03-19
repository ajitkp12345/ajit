{
  "name": "webex-ack-bot",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "webhook:create": "node scripts/register-webhook.js",
    "webhook:clear": "node scripts/remove-webhooks.js"
  },
  "dependencies": {
    "axios": "^1.7.7",
    "body-parser": "^1.20.2",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "node-cron": "^3.0.3",
    "winston": "^3.13.0",
    "webex-node-bot-framework": "^0.9.9"
  },
  "devDependencies": {}
}