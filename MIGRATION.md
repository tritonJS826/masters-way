# Инструкция по деплою монолита

## Порядок действий

### 1. Остановить старый стек

```bash
docker compose down
```

> ⚠️ НЕ используй `-v`! Volume с данными старых баз должны сохраниться.

### 2. Подтянуть изменения

```bash
git pull
```

### 3. Запустить новый стек

Новый `docker-compose.yml` поднимает основной сервер + старые postgres-контейнеры (с сохранением старых данных через volume).

```bash
docker compose up -d
```

Что поднимется:
- `postgres-general` (основная база, порт 5432)
- `mw-server` (монолит, порт 8000)
- `postgres-mail` (5438), `postgres-notification` (5434), `postgres-storage` (5435), `postgres-survey` (5436), `postgres-training` (5440), `postgres-chat` (5433) — старые базы с данными из volume
- `mw-chat-websocket` (7994), `mw-test-websocket` (7991), `mw-notification-websocket` (7996)
- `mw-telegram-bot` (7997)
- `nginx` (443)

### 4. Проверить что старые базы поднялись с данными

```bash
docker exec postgres-chat psql -U root -d mastersway_chat_db -c "SELECT count(*) FROM messages;"
docker exec postgres-mail psql -U root -d mastersway_mail_db -c "SELECT count(*) FROM mail_logs;"
```

> Если таблиц нет — возможно volume не примонтировался. Проверь `docker volume ls | grep postgres-`.

### 5. Применить схему новых таблиц

Добавляет таблицы удалённых сервисов в `mastersway_db`:

```bash
docker cp mw-server/scripts/01_merge_schema.sql postgres-general:/tmp/
docker exec postgres-general psql -U root -d mastersway_db -f /tmp/01_merge_schema.sql
```

### 6. Перенести данные из старых баз в основную

Скрипт использует `postgres_fdw` для подключения к старым postgres-контейнерам по их Docker-именам.

```bash
docker cp mw-server/scripts/02_migrate_data.sql postgres-general:/tmp/
docker exec postgres-general psql -U root -d mastersway_db -f /tmp/02_migrate_data.sql
```

### 7. Проверить что данные скопировались

```bash
docker exec postgres-general psql -U root -d mastersway_db -c "
SELECT 'mail_logs' as tbl, count(*) FROM mail_logs
UNION ALL SELECT 'notifications', count(*) FROM notifications
UNION ALL SELECT 'notification_settings', count(*) FROM notification_settings
UNION ALL SELECT 'files', count(*) FROM files
UNION ALL SELECT 'user_intro', count(*) FROM user_intro
UNION ALL SELECT 'looking_for_mentor', count(*) FROM looking_for_mentor
UNION ALL SELECT 'trainings', count(*) FROM trainings
UNION ALL SELECT 'rooms', count(*) FROM rooms
UNION ALL SELECT 'messages', count(*) FROM messages;
"
```

### 8. Очистить foreign servers

```bash
docker exec postgres-general psql -U root -d mastersway_db -c "
DROP FOREIGN TABLE IF EXISTS mail_logs_old, notifications_old, notification_settings_old, files_old, user_intro_old, looking_for_mentor_old, trainings_old, rooms_old, users_rooms_old, messages_old, message_status_old CASCADE;
DROP SERVER IF EXISTS fdw_mail, fdw_notification, fdw_storage, fdw_survey, fdw_training, fdw_chat CASCADE;
"
```

### 9. Убрать старые базы из docker-compose.yml

После успешной миграции открой `docker-compose.yml` и удали:
- Блок старых postgres-контейнеров (от `# Старые postgres-контейнеры` до `nginx:`)
- Старые volume из секции `volumes:` (помечены `# Старые volume`)

### 10. Остановить и удалить старые контейнеры

```bash
docker stop postgres-mail postgres-notification postgres-storage postgres-survey postgres-training postgres-chat
docker rm postgres-mail postgres-notification postgres-storage postgres-survey postgres-training postgres-chat
docker volume rm postgres-mail postgres-notification postgres-storage postgres-survey postgres-training postgres-chat 2>/dev/null
```

### 11. Заполнить .env

В `mw-server/.env` заполни SMTP-переменные (**обязательно только для prod**):
```bash
SENDER_EMAIL=твой_gmail@gmail.com
SENDER_NAME=MastersWay
SENDER_PASSWORD=google_app_password
SMTP_AUTH_ADDRESS=smtp.gmail.com
SMTP_SERVER_ADDRESS=smtp.gmail.com:587
```

### 12. Финальный рестарт

```bash
docker compose down
docker compose up -d
```

### Готово

```
✅ старый стек остановлен
✅ новый стек запущен со старыми базами
✅ схема новых таблиц применена (01_merge_schema.sql)
✅ данные перенесены (02_migrate_data.sql)
✅ foreign servers очищены
✅ старые базы убраны из docker-compose
✅ старые контейнеры и volume удалены
✅ .env заполнен
```

Фронтенд: nginx → `/general` → `mw-server:8000` (монолит).
WebSocket-сервисы, telegram-bot — без изменений.