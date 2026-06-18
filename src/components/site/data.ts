import type { FeaturedCatalogItem } from "./catalog-types";

export type { FeaturedCatalogItem };

export type CatalogItem = {
  icon: string;
  name: string;
  cat: "interior" | "cafe" | "decor" | "misc";
  catLabel: string;
  mat: string;
};

export const featuredCatalogItems = [
  {
    id: "millennium-falcon",
    name: "Millennium Falcon",
    mat: "PETG · PLA",
    catLabel: "Коллекция",
    description:
      "Детализированная модель легендарного корабля для ценителей мира «Звёздных войн», коллекционеров и как выразительный элемент декора.",
    cover: "/catalog/millennium-falcon/main.png",
    gallery: [
      { type: "image", src: "/catalog/millennium-falcon/main.png", alt: "Millennium Falcon — общий вид" },
      { type: "image", src: "/catalog/millennium-falcon/photo-01-cockpit.jpg", alt: "Кокпит с фигурками" },
      { type: "image", src: "/catalog/millennium-falcon/photo-02-stand.jpg", alt: "На подставке" },
      { type: "image", src: "/catalog/millennium-falcon/photo-03-side.jpg", alt: "Вид сбоку" },
      { type: "image", src: "/catalog/millennium-falcon/photo-04-top.jpg", alt: "Вид сверху" },
      { type: "image", src: "/catalog/millennium-falcon/photo-05-desk.jpg", alt: "На рабочем столе" },
      {
        type: "video",
        src: "/catalog/millennium-falcon/tour.mp4",
        poster: "/catalog/millennium-falcon/tour-poster.jpg",
        alt: "Видеообзор модели",
      },
    ],
    featured: true,
  },
  {
    id: "oko-lamp",
    name: "ОКО",
    mat: "PLA",
    catLabel: "Декор",
    description:
      "Декоративный настенный светильник в форме глаза — не основной источник света, а акцент для атмосферы. Внутри RGB-лампочка с пультом: меняйте цвет и яркость под настроение. Питается от трёх батареек AAA. В интерьере особенно эффектно смотрится пара или группа — живой, мягкий свет без лишней нагрузки на глаза.",
    cover: "/catalog/oko/main.png",
    gallery: [
      { type: "image", src: "/catalog/oko/main.png", alt: "ОКО — общий вид" },
      {
        type: "image",
        src: "/catalog/oko/photo-02-lit.jpg",
        alt: "Светильник включён",
      },
      {
        type: "image",
        src: "/catalog/oko/photo-03-interior.jpg",
        alt: "В интерьере",
      },
      {
        type: "image",
        src: "/catalog/oko/photo-04-back.jpg",
        alt: "Вид сзади",
      },
      {
        type: "image",
        src: "/catalog/oko/photo-05-angle.jpg",
        alt: "Детали текстуры",
      },
      {
        type: "image",
        src: "/catalog/oko/photo-06-desk.jpg",
        alt: "На стене над рабочим местом",
      },
      {
        type: "video",
        src: "/catalog/oko/tour.mp4",
        poster: "/catalog/oko/tour-poster.jpg",
        alt: "Видеообзор светильника",
      },
    ],
    featured: true,
  },
] satisfies FeaturedCatalogItem[];

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
    mat: "запасной, под FDM-принтер",
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
];

export const filterOptions = [
  { id: "all", label: "Все" },
  { id: "interior", label: "Интерьер" },
  { id: "cafe", label: "Кафе" },
  { id: "decor", label: "Декор" },
  { id: "misc", label: "Разное" },
] as const;

export const modelSites = [
  { name: "MakerWorld", url: "https://makerworld.com/ru" },
  { name: "Printables", url: "https://www.printables.com/" },
  { name: "Thingiverse", url: "https://www.thingiverse.com/" },
  { name: "Thangs", url: "https://thangs.com/" },
  { name: "Cults3D", url: "https://cults3d.com/ru" },
] as const;
