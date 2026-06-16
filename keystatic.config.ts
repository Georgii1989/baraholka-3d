import { config, collection, fields, singleton } from "@keystatic/core";

const githubRepo = process.env.KEYSTATIC_GITHUB_REPO;

function parseGithubRepo(repo: string) {
  const [owner, name] = repo.split("/");
  if (!owner || !name) {
    throw new Error(`Invalid KEYSTATIC_GITHUB_REPO: ${repo}`);
  }
  return { owner, name };
}

export default config({
  storage: githubRepo
    ? { kind: "github", repo: parseGithubRepo(githubRepo) }
    : { kind: "local" },
  ui: {
    brand: { name: "Baraholka 3D" },
  },
  singletons: {
    site: singleton({
      label: "Главная и контакты",
      path: "content/site/",
      format: { data: "json" },
      schema: {
        heroBadge: fields.text({
          label: "Hero · бейдж",
          defaultValue: "Студия 3D-печати",
        }),
        heroTitle: fields.text({
          label: "Hero · заголовок",
          multiline: true,
          defaultValue: "Готовые модели и расходники —",
        }),
        heroHighlight: fields.text({
          label: "Hero · акцент (lime)",
          defaultValue: "без лишнего шума",
        }),
        heroDescription: fields.text({
          label: "Hero · описание",
          multiline: true,
        }),
        worksEyebrow: fields.text({ label: "Галерея · eyebrow", defaultValue: "Галерея" }),
        worksTitle: fields.text({
          label: "Галерея · заголовок",
          defaultValue: "Что уже напечатано",
        }),
        worksDescription: fields.text({
          label: "Галерея · описание",
          multiline: true,
        }),
        shopEyebrow: fields.text({ label: "Магазин · eyebrow", defaultValue: "Магазин" }),
        shopTitle: fields.text({
          label: "Магазин · заголовок",
          defaultValue: "Аксессуары с фиксированной ценой",
        }),
        shopDescription: fields.text({
          label: "Магазин · описание",
          multiline: true,
        }),
        contactsEyebrow: fields.text({ label: "Контакты · eyebrow", defaultValue: "Контакты" }),
        contactsTitle: fields.text({ label: "Контакты · заголовок", defaultValue: "На связи" }),
        contactsDescription: fields.text({
          label: "Контакты · описание",
          multiline: true,
        }),
        telegramUrl: fields.url({ label: "Telegram" }),
        instagramUrl: fields.url({ label: "Instagram" }),
        footerText: fields.text({
          label: "Footer",
          defaultValue: "Baraholka 3D · студия 3D-печати",
        }),
      },
    }),
  },
  collections: {
    works: collection({
      label: "Работы",
      slugField: "title",
      path: "content/works/*/",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Название" } }),
        description: fields.text({ label: "Описание", multiline: true }),
        images: fields.array(
          fields.image({
            label: "Фото",
            directory: "public/works",
            publicPath: "/works/",
          }),
          {
            label: "Фото",
            itemLabel: (props) => props.value?.filename ?? "Фото",
          },
        ),
        status: fields.select({
          label: "Статус",
          options: [
            { label: "В наличии", value: "available" },
            { label: "Продано", value: "sold" },
            { label: "Под заказ", value: "custom" },
          ],
          defaultValue: "available",
        }),
        pricing: fields.select({
          label: "Тип цены",
          options: [
            { label: "По договорённости", value: "negotiable" },
            { label: "Фиксированная", value: "fixed" },
          ],
          defaultValue: "negotiable",
        }),
        price: fields.integer({ label: "Цена ₽ (если фиксированная)" }),
        featured: fields.checkbox({ label: "Featured", defaultValue: false }),
      },
    }),
    shop: collection({
      label: "Магазин",
      slugField: "title",
      path: "content/shop/*/",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Название" } }),
        description: fields.text({ label: "Описание", multiline: true }),
        image: fields.image({
          label: "Фото",
          directory: "public/shop",
          publicPath: "/shop/",
        }),
        price: fields.integer({ label: "Цена ₽" }),
        inStock: fields.checkbox({ label: "В наличии", defaultValue: true }),
      },
    }),
  },
});
