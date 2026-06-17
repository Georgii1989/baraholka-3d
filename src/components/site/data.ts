export type CatalogItem = {
  icon: string;
  name: string;
  cat: "interior" | "cafe" | "decor" | "misc";
  catLabel: string;
  mat: string;
};

export type ShopItem = {
  icon: string;
  name: string;
  mat: string;
  price: string;
};

export const catalogItems: CatalogItem[] = [
  {
    icon: "planter",
    name: "Кашпо «Гранат»",
    cat: "interior",
    catLabel: "Интерьер",
    mat: "PETG · ребристая текстура",
  },
  {
    icon: "coaster",
    name: "Подставка «Шестигранник»",
    cat: "cafe",
    catLabel: "Кафе",
    mat: "PLA · набор 4 шт.",
  },
  {
    icon: "organizer",
    name: "Органайзер «Сетка»",
    cat: "interior",
    catLabel: "Интерьер",
    mat: "PETG · ящик для мелочей",
  },
  {
    icon: "lamp",
    name: "Абажур «Соты»",
    cat: "decor",
    catLabel: "Декор",
    mat: "PLA · рассеивает свет",
  },
  {
    icon: "figurine",
    name: "Фигурка-робот «Дрон»",
    cat: "decor",
    catLabel: "Декор",
    mat: "PLA · 2 цвета",
  },
  {
    icon: "phoneStand",
    name: "Подставка «Стапель»",
    cat: "misc",
    catLabel: "Разное",
    mat: "PETG · под телефон/планшет",
  },
  {
    icon: "vase",
    name: "Ваза «Спираль»",
    cat: "interior",
    catLabel: "Интерьер",
    mat: "PLA · витая стенка",
  },
  {
    icon: "spiral",
    name: "Держатель салфеток",
    cat: "cafe",
    catLabel: "Кафе",
    mat: "PETG · устойчивый",
  },
];

export const shopItems: ShopItem[] = [
  {
    icon: "led",
    name: "RGB-подсветка, лента 1м",
    mat: "для AMS / корпуса принтера",
    price: "990 ₽",
  },
  {
    icon: "hotend",
    name: "Хотэнд 0.4мм",
    mat: "запасной, под Bambu Lab A1",
    price: "1290 ₽",
  },
  {
    icon: "hotend",
    name: "Хотэнд 0.6мм",
    mat: "для крупных деталей",
    price: "1390 ₽",
  },
  {
    icon: "spool",
    name: "PLA филамент, 1кг",
    mat: "10+ цветов в наличии",
    price: "1190 ₽",
  },
  {
    icon: "spool",
    name: "PETG филамент, 1кг",
    mat: "прочный, термостойкий",
    price: "1390 ₽",
  },
  {
    icon: "spool",
    name: "TPU филамент, 1кг",
    mat: "гибкий, для амортизации",
    price: "1690 ₽",
  },
];

export const filterOptions = [
  { id: "all", label: "Все" },
  { id: "interior", label: "Интерьер" },
  { id: "cafe", label: "Кафе" },
  { id: "decor", label: "Декор" },
  { id: "misc", label: "Разное" },
] as const;
