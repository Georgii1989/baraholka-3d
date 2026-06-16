# Keystatic CMS

Редактор: **https://baraholka-3d.vercel.app/keystatic** (или `/keystatic` локально).

Контент хранится в репозитории:

| Раздел | Путь |
|--------|------|
| Главная, секции, контакты | `content/site/index.json` |
| Галерея работ | `content/works/*/index.json` |
| Магазин | `content/shop/*/index.json` |
| Фото работ | `public/works/` |
| Фото товаров | `public/shop/` |

## Локально

```bash
npm run dev
```

Откройте [http://localhost:3000/keystatic](http://localhost:3000/keystatic). Без переменных GitHub Keystatic пишет файлы прямо в `content/` на диске.

## Production (GitHub + Vercel)

1. **Репозиторий** — код должен быть в GitHub, Vercel деплоит из него.
2. **Keystatic GitHub App** — [keystatic.com/docs/github-mode](https://keystatic.com/docs/github-mode):
   - Создайте GitHub App (или используйте шаблон Keystatic).
   - Дайте App доступ к репозиторию сайта.
3. **Переменные в Vercel** (Settings → Environment Variables):

   | Переменная | Значение |
   |------------|----------|
   | `KEYSTATIC_GITHUB_REPO` | `ваш-username/baraholka-3d` |
   | `KEYSTATIC_GITHUB_CLIENT_ID` | из GitHub App |
   | `KEYSTATIC_GITHUB_CLIENT_SECRET` | из GitHub App |
   | `KEYSTATIC_SECRET` | случайная длинная строка |
   | `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | slug вашего GitHub App |

4. **Redeploy** на Vercel после добавления env.
5. Откройте `/keystatic` на production → войдите через GitHub → правки коммитятся в репо → Vercel пересобирает сайт.

## Что можно менять без кода

- Тексты hero, заголовки секций, footer
- Ссылку Telegram / Instagram
- Работы: название, описание, фото, статус, featured
- Товары: название, описание, фото, цена, наличие

Чат и Telegram-бот по-прежнему настраиваются через env (`TELEGRAM_*`), не через CMS.
