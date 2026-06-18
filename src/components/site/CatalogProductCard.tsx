"use client";

import type { FeaturedCatalogItem } from "@/components/site/catalog-types";

type Props = {
  item: FeaturedCatalogItem;
  onOpen: () => void;
};

export function CatalogProductCard({ item, onOpen }: Props) {
  return (
    <article className="product-card reveal">
      <button
        type="button"
        className="product-card-visual"
        onClick={onOpen}
        aria-label={`Открыть ${item.name}`}
      >
        {item.featured ? (
          <span className="product-card-badge">Новинка</span>
        ) : null}
        <img
          src={item.cover}
          alt={item.name}
          className="product-card-image"
          loading="lazy"
          decoding="async"
        />
      </button>
      <div className="product-card-body">
        <div className="product-card-top">
          <span className="tag">{item.catLabel}</span>
        </div>
        <h3>{item.name}</h3>
        <p className="material">{item.mat}</p>
        <div className="card-foot">
          <span className="price-pill">по договорённости</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onOpen}>
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}
