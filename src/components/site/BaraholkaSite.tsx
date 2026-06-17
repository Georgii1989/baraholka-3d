"use client";

import { FilamentThreadsBackground } from "@/components/background/FilamentThreadsBackground";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { useChatUi } from "@/components/providers/ChatProvider";
import {
  catalogItems,
  filterOptions,
  shopItems,
} from "@/components/site/data";
import { SiteIcon } from "@/components/site/SiteIcons";
import { useCallback, useEffect, useRef, useState } from "react";
import "./baraholka-site.css";

const NAV_IDS = ["catalog", "shop", "order", "about", "contacts"] as const;
const FLEET_INITIAL = [64, 28, 91, 47, 12];

export function BaraholkaSite() {
  const { openChat } = useChatUi();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<(typeof filterOptions)[number]["id"]>("all");
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [fleet, setFleet] = useState(FLEET_INITIAL);
  const progressRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  const openTopic = useCallback(
    (topic: string) => {
      openChat(topic);
      setMenuOpen(false);
    },
    [openChat],
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setFleet((prev) =>
        prev.map((value) => {
          const next = value + Math.floor(Math.random() * 7) + 1;
          return next > 100 ? Math.floor(Math.random() * 15) : next;
        }),
      );
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setScrollPct(pct);

      let current: string | null = null;
      for (const id of NAV_IDS) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top - 140 <= 0) {
          current = id;
        }
      }
      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".b3d .reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <>
      <FilamentThreadsBackground />

      <div className="b3d">
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>

        <div className="progress-track" aria-hidden="true">
          <div
            ref={progressRef}
            className="progress-fill"
            style={{ transform: `scaleX(${scrollPct})` }}
          />
        </div>
        <div className="progress-label" aria-hidden="true">
          {Math.round(scrollPct * 100)}%
        </div>

        <header className="site-header">
          <div className="nav">
            <a href="#main" className="logo">
              <span className="logo-main">Baraholka</span>
              <span className="logo-sub">_G3D</span>
            </a>

            <nav className="nav-links" aria-label="Основная навигация">
              {NAV_IDS.map((id) => {
                const labels: Record<(typeof NAV_IDS)[number], string> = {
                  catalog: "Барахолка",
                  shop: "Магазин",
                  order: "На заказ",
                  about: "О студии",
                  contacts: "Контакты",
                };
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={activeSection === id ? "active" : undefined}
                  >
                    {labels[id]}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              className="btn btn-primary btn-sm nav-cta"
              onClick={() => openTopic("Общий вопрос")}
            >
              Написать →
            </button>

            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <SiteIcon name="menu" size={18} />
            </button>
          </div>

          <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
            {NAV_IDS.map((id) => {
              const labels: Record<(typeof NAV_IDS)[number], string> = {
                catalog: "Барахолка",
                shop: "Магазин",
                order: "На заказ",
                about: "О студии",
                contacts: "Контакты",
              };
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {labels[id]}
                </a>
              );
            })}
          </div>
        </header>

        <main id="main">
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-copy reveal is-visible">
                <p className="eyebrow">5 принтеров онлайн</p>
                <h1>
                  Растим вещи
                  <br />
                  <span className="accent">слой за слоем.</span>
                </h1>
                <p className="lead">
                  Барахолка студии 3D-печати G3D — готовые модели для дома,
                  интерьера кафе и гостиниц. Нашли то, что зацепило? Напишите —
                  договоримся о цене и доставке.
                </p>
                <div className="hero-actions">
                  <a href="#catalog" className="chip-link">
                    Барахолка моделей →
                  </a>
                  <a href="#shop" className="chip-link">
                    Магазин аксессуаров →
                  </a>
                  <button
                    type="button"
                    className="chip-link"
                    onClick={() => openTopic("Печать на заказ")}
                  >
                    Печать на заказ →
                  </button>
                </div>

                <div className="fleet" aria-hidden="true">
                  <p className="fleet-title">Очередь печати · сейчас</p>
                  {fleet.map((pct, index) => (
                    <div className="fleet-row" key={index}>
                      <span className="fleet-id">A1 · #{index + 1}</span>
                      <span className="fleet-bar">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                      <span className="fleet-pct">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hero-visual reveal is-visible">
                <div className="hero-video-wrap">
                  <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/media/hero-print-poster.jpg"
                  >
                    <source src="/media/hero-print.mp4" type="video/mp4" />
                  </video>
                  <div className="hero-glow-ring" aria-hidden="true" />
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="about">
            <div className="container">
              <div className="about-grid">
                <div className="reveal">
                  <p className="eyebrow">О студии</p>
                  <h2>Пять принтеров — одна точная задача</h2>
                  <div className="about-text">
                    <p>
                      Студия работает на пяти Bambu Lab A1 одновременно — партии
                      моделей печатаются параллельно, а не друг за другом.
                    </p>
                    <p>
                      Печатаем PLA, PETG и TPU, подбираем цвет под задачу и
                      проверяем каждую деталь руками перед тем, как отдать или
                      выложить в каталог.
                    </p>
                  </div>
                  <div className="material-tags">
                    {["PLA", "PETG", "TPU (гибкий)", "Мультицвет"].map((tag) => (
                      <span className="material-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="stat-strip reveal">
                  {[
                    ["5", "принтеров Bambu Lab A1 в параллели"],
                    ["0.08мм", "минимальная высота слоя"],
                    ["3", "материала в работе постоянно"],
                    ["1–3 дня", "обычный срок старта заказа"],
                  ].map(([num, lbl]) => (
                    <div className="stat" key={lbl}>
                      <span className="num">{num}</span>
                      <span className="lbl">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="catalog">
            <div className="container">
              <div className="section-head reveal">
                <p className="eyebrow">Барахолка</p>
                <h2>Готовые модели — забирайте по договорённости</h2>
                <p className="section-sub">
                  Напечатанные модели для дома, кафе и декора. Фиксированных цен
                  нет — напишите в чат, обсудим.
                </p>
              </div>

              <div
                className="filters"
                role="group"
                aria-label="Фильтр по категориям"
              >
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="filter-chip"
                    data-filter={option.id}
                    aria-pressed={filter === option.id}
                    onClick={() => setFilter(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-4">
                {catalogItems
                  .filter((item) => filter === "all" || item.cat === filter)
                  .map((item) => (
                    <article className="card reveal" key={item.name}>
                      <div className="card-top">
                        <div className="card-icon">
                          <SiteIcon name={item.icon} size={24} />
                        </div>
                        <span className="tag">{item.catLabel}</span>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="material">{item.mat}</p>
                      <div className="card-foot">
                        <span className="price-pill">по договорённости</span>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() =>
                            openTopic(`Барахолка · ${item.name}`)
                          }
                        >
                          Написать
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </section>

          <section className="section" id="shop">
            <div className="container">
              <div className="section-head reveal">
                <p className="eyebrow">Магазин</p>
                <h2>Аксессуары для принтеров</h2>
                <p className="section-sub">
                  Подсветка, запасные хотэнды и филамент — всё, что обычно
                  докупают, пока принтеры работают.
                </p>
              </div>

              <div className="grid grid-3">
                {shopItems.map((item) => (
                  <article className="card reveal" key={item.name}>
                    <div className="card-top">
                      <div className="card-icon">
                        <SiteIcon name={item.icon} size={24} />
                      </div>
                    </div>
                    <h3>{item.name}</h3>
                    <p className="material">{item.mat}</p>
                    <div className="card-foot">
                      <span className="price-real">{item.price}</span>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => openTopic(`Магазин · ${item.name}`)}
                      >
                        Заказать
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="order">
            <div className="container">
              <div className="section-head reveal">
                <p className="eyebrow">На заказ</p>
                <h2>Принесите свою модель — напечатаем</h2>
                <p className="section-sub">
                  Ссылка на MakerWorld, Thingiverse, Printables — или свой STL /
                  3MF. Посчитаем материал, сроки и цену в чате.
                </p>
              </div>

              <div className="steps">
                {[
                  [
                    "01 / Модель",
                    "Находите модель",
                    "Ссылка на MakerWorld, Thingiverse, Printables — или свой файл STL / 3MF.",
                  ],
                  [
                    "02 / Передача",
                    "Присылаете нам",
                    "Откройте чат на сайте — сообщение придёт нам в Telegram.",
                  ],
                  [
                    "03 / Договор",
                    "Согласуем детали",
                    "Материал, цвет, скорость и итоговую цену — до начала печати.",
                  ],
                  [
                    "04 / Готово",
                    "Печатаем и передаём",
                    "Забор в студии или доставка — как удобнее.",
                  ],
                ].map(([num, title, text]) => (
                  <div className="step reveal" key={num}>
                    <span className="step-num">{num}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>

              <div className="order-cta reveal">
                <p>
                  Не уверены, что модель технически напечатается? Пришлите
                  ссылку — посмотрим геометрию и скажем честно.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openTopic("Печать на заказ · проверка модели")}
                >
                  Прислать модель →
                </button>
              </div>
            </div>
          </section>

          <section className="section" id="contacts" style={{ borderBottom: "none" }}>
            <div className="container">
              <div className="contact-grid">
                <div className="reveal">
                  <p className="eyebrow">Контакты</p>
                  <h2>
                    Печать завершена.
                    <br />
                    Можно забирать.
                  </h2>
                  <p className="section-sub">
                    Основной канал — чат на сайте. Ответ придёт из Telegram.
                    Контакты ниже добавим позже.
                  </p>

                  <div className="contact-list">
                    <button
                      type="button"
                      className="contact-item"
                      onClick={() => openTopic("Общий вопрос")}
                    >
                      <span className="ico">
                        <SiteIcon name="chat" size={18} />
                      </span>
                      <span className="meta">
                        <small>Чат сайта</small>
                        Обсудить цену и заказ
                      </span>
                    </button>
                    <a href="https://t.me/sloy_studio" className="contact-item">
                      <span className="ico">
                        <SiteIcon name="telegram" size={18} />
                      </span>
                      <span className="meta">
                        <small>Telegram</small>@sloy_studio
                      </span>
                    </a>
                    <a href="mailto:hello@sloy.studio" className="contact-item">
                      <span className="ico">
                        <SiteIcon name="mail" size={18} />
                      </span>
                      <span className="meta">
                        <small>Почта</small>
                        hello@sloy.studio
                      </span>
                    </a>
                  </div>
                </div>

                <div className="reveal">
                  <div className="info-block">
                    {[
                      ["Студия", "Baraholka_G3D"],
                      ["Оборудование", "5 × Bambu Lab A1"],
                      ["Материалы", "PLA · PETG · TPU"],
                      ["Барахолка", "цена в чате"],
                      ["Заказы", "модель / ссылка → расчёт"],
                    ].map(([label, value]) => (
                      <div className="row" key={label}>
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container footer-row">
            <span className="logo">
              <span className="logo-main">Baraholka</span>
              <span className="logo-sub">_G3D</span>
            </span>
            <span>© {year} · студия 3D-печати на Bambu Lab A1</span>
          </div>
        </footer>
      </div>

      <ChatWidget />
    </>
  );
}
