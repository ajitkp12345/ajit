# Webex ACK Bot – Starter Project

A production-ready **starter** for a Cisco Webex bot that monitors chat messages for task acknowledgements (e.g., `ack`, `done`, `completed`), tracks who has acknowledged, and posts **summary reports** on-demand or on a schedule.

## ✨ Features

- ✅ Listens to messages via **Webex webhooks**
- ✅ Parses acknowledgements using configurable **keywords/regex**
- ✅ Tracks ACKs **per space** and **per task** (defaults to daily task)
- ✅ **On-demand** summaries via `@bot summary`
- ✅ **Scheduled** summaries via cron (e.g., end of shift)
- ✅ Lightweight **file-based storage** by default (JSON)
- 🔁 Optional path to add MongoDB storage later
- 🧪 Local testing with **ngrok**
- 🐳 Docker-ready

---

## 📦 Project Structure

```
webex-ack-bot/
├─ src/
│  ├─ index.js               # App entrypoint
│  ├─ config.js              # Env & config
│  ├─ logger.js              # Winston logger
│  ├─ services/
│  │  ├─ ackStore.js        # Storage abstraction
│  │  ├─ fileStore.js       # File-based store (default)
│  │  └─ mongoStore.js      # (Optional) MongoDB store – stub
│  └─ utils/
│     ├─ parser.js          # ACK keyword/regex parsing
│     └─ summary.js         # Summary formatter
├─ scripts/
│  ├─ register-webhook.js   # Create Webex webhook
│  └─ remove-webhooks.js    # Delete existing webhooks
├─ .env.example             # Copy to .env and fill in values
├─ package.json
├─ Dockerfile
├─ docker-compose.yml
├─ .gitignore
└─ README.md
```

---

## 🚀 Quick Start

### 1) Prerequisites
- **Node.js LTS** (18+ recommended)
- A **Webex Bot** (get token at https://developer.webex.com/my-apps)
- (Optional) **ngrok** for local testing (https://ngrok.com)

### 2) Configure

```bash
cp .env.example .env
# Edit .env and set BOT_TOKEN, WEBHOOK_URL, SUMMARY_CRON etc.
```

### 3) Install & Run

```bash
npm install
npm run dev  # or: npm start
```

### 4) Expose Local Server (for webhooks)

```bash
# In another terminal
ngrok http 3000

# Copy the ngrok https URL and set WEBHOOK_URL in .env, e.g.
# WEBHOOK_URL=https://abc123.ngrok.app/webhook
```

### 5) Create Webhook

```bash
npm run webhook:create
```

> Re-run if your public URL changes (e.g., ngrok restarts)

### 6) Add Bot to Your Webex Space
Add the bot’s email (e.g., `your-bot@webex.bot`) to your NOC space.

---

## 💬 Commands (mention the bot or DM)

- `ack <taskId?>` – Acknowledge the current or specified task
- `summary [<taskId>]` – Show summary for today (default) or a specific task
- `status [<taskId>]` – Alias for `summary`
- `help` – Show help text

> **Implicit ACKs**: If anyone posts a message that contains any of the keywords (default: `ack, done, completed, finished, ok`) the bot records an ACK for that person in the **current task context** (defaults to the day, e.g., `2026-03-18`).

---

## ⚙️ Environment Variables

Create a `.env` file using `.env.example` as a template.

| Variable | Required | Description |
|---|---|---|
| `BOT_TOKEN` | ✅ | Webex Bot token from developer portal |
| `WEBHOOK_URL` | ✅ | Public HTTPS URL pointing to `/webhook` (ngrok or prod) |
| `PORT` |  | Default `3000` |
| `DEFAULT_TASK_MODE` |  | `daily` (default) or `static` |
| `DEFAULT_STATIC_TASK_ID` |  | Used if mode is `static` |
| `ACK_KEYWORDS` |  | Comma-separated list (case-insensitive) |
| `SUMMARY_CRON` |  | Cron schedule (e.g., `0 30 18 * * 1-5`) |
| `DATA_DIR` |  | Folder for file store (default `data/`) |
| `MONGODB_URI` |  | Optional: if provided, use Mongo store |

---

## 🧪 Testing Scenarios

1. Post messages like `ack`, `done`, or `completed` → user should be recorded as acknowledged.
2. Mention bot with `@bot summary` → respond with ✅ Completed and ❌ Pending lists.
3. Provide `ack task-42` → recorded under `task-42`.
4. Switch to `DEFAULT_TASK_MODE=static` to track a single task across the shift.

---

## 🐳 Docker

```bash
docker build -t webex-ack-bot .
docker run --env-file .env -p 3000:3000 webex-ack-bot
```

Or use `docker-compose` (includes a commented MongoDB service scaffold).

---

## 🛡️ Notes

- Keep your **BOT_TOKEN** secure. Do **not** commit `.env`.
- If you rotate tokens, update the environment and redeploy.
- Recreate webhook when your public URL changes.

---

## 📚 References
- Webex for Developers – Messaging, Webhooks & Bots: https://developer.webex.com
- webex-node-bot-framework: https://github.com/WebexCommunity/webex-node-bot-framework

