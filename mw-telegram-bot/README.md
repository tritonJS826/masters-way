# MW Telegram Bot

Telegram bot for Masters Way platform that allows users to log their progress (jobDone descriptions) directly from Telegram.

## Features

- `/start` - Get started with the bot
- `/login` - Link your Google account
- `/link <code>` - Complete account linking with code from login
- `/logout` - Unlink your account
- `/jobdone <description>` - Log your completed work
- `/status` - Check bot connection status
- `/help` - Show available commands

## Authentication Flow

1. Run `/login` to get an authentication link
2. Click the link and sign in with Google
3. Enter the code shown in Telegram using `/link <code>`
4. Your account is now linked - you can log progress!

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API token | Yes |
| `TELEGRAM_BOT_WEBHOOK_URL` | Webhook URL for production | Prod only |
| `TELEGRAM_BOT_MODE` | `polling` or `webhook` | No (default: polling) |
| `TELEGRAM_BOT_PORT` | Bot port (default: 7997) | No |
| `GENERAL_BFF_API_HOST` | General BFF API host | Yes |
| `GENERAL_BFF_BASE_URL` | General BFF API base URL | Yes |
| `ENV_TYPE` | Environment type (`dev` or `prod`) | Yes |
| `SECRET_SESSION_KEY` | Session secret for API authentication | Yes |

### Files

- `.env.local.example` - Example environment file for local development
- `.env.local.docker.example` - Example environment file for Docker deployment

## Development

```bash
# Install dependencies
make install

# Build the project
make build

# Run the bot
make start

# Run tests
make test
```

## Docker

```bash
# Build the image
docker build -t mw-telegram-bot .

# Run the container
docker run -d --name mw-telegram-bot \
  --env-file .env \
  mw-telegram-bot
```

## Data Storage

User mappings (Telegram ID -> User UUID) are stored in `telegram_users.json` in the bot's working directory. This file is gitignored.

## API Integration

The bot integrates with `mw-general-bff` via these endpoints:

- `POST /auth/telegram/initiate` - Initiates login, returns auth URL and code
- `POST /auth/telegram/validate` - Validates code and returns user info
- `POST /jobDones` - Creates jobDone records
