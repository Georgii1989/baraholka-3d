# Baraholka 3D

Сайт-витрина 3D-студии: галерея напечатанных моделей, магазин аксессуаров с фиксированными ценами, чат с Telegram.

## Быстрый старт

```bash
cd "d:\cursor project\baraholka-3d"
cp .env.example .env.local
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Telegram-бот

1. Создайте бота через [@BotFather](https://t.me/BotFather) → получите `TELEGRAM_BOT_TOKEN`.
2. Узнайте свой `chat_id` через [@userinfobot](https://t.me/userinfobot).
3. Заполните `.env.local`:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_ADMIN_CHAT_ID=...
DATABASE_PATH=./data/chat.db
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Локально (без webhook)

```bash
npm run dev
npm run telegram:poll
```

Ответьте **reply** на сообщение бота в Telegram — ответ появится в чате на сайте.

### На Vercel (webhook)

После деплоя:

```bash
curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-app>.vercel.app/api/telegram/webhook"
```

## Контент (Keystatic CMS)

Редактор: **`/keystatic`** — тексты главной, галерея, магазин, контакты.

| Раздел | Путь |
|--------|------|
| Главная и секции | `content/site/index.json` |
| Работы | `content/works/*/index.json` + `public/works/` |
| Магазин | `content/shop/*/index.json` + `public/shop/` |

Подробная настройка GitHub + Vercel: [`docs/keystatic-setup.md`](docs/keystatic-setup.md).

## Деплой на Vercel

1. Импортируйте репозиторий в Vercel.
2. Добавьте env: `TELEGRAM_*`, `NEXT_PUBLIC_SITE_URL`, и для CMS — `KEYSTATIC_*` (см. `.env.example`).
3. На serverless SQLite не сохраняется между инстансами — для продакшена мигрируйте на Turso/Postgres/KV (см. комментарий в плане).

## Скиллы (опционально)

```bash
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --skill react-best-practices -y
npx skills add github/awesome-copilot --skill gsap-framer-scroll-animation -y
npx skills add sickn33/antigravity-awesome-skills --skill scroll-experience -y
```

Design system: `design-system/baraholka-3d/MASTER.md`
