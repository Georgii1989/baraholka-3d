"use client";

import type {
  CatalogGalleryItem,
  FeaturedCatalogItem,
} from "@/components/site/catalog-types";
import { useCallback, useEffect, useState } from "react";

type Props = {
  item: FeaturedCatalogItem;
  onClose: () => void;
  onDiscuss: () => void;
};

function galleryLabel(item: CatalogGalleryItem, index: number, name: string) {
  if (item.alt) return item.alt;
  if (item.type === "video") return `${name} — видео`;
  return `${name} — фото ${index + 1}`;
}

export function CatalogProductModal({ item, onClose, onDiscuss }: Props) {
  const [index, setIndex] = useState(0);
  const hasMultiple = item.gallery.length > 1;
  const current = item.gallery[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i === 0 ? item.gallery.length - 1 : i - 1));
  }, [item.gallery.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i === item.gallery.length - 1 ? 0 : i + 1));
  }, [item.gallery.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && hasMultiple) goPrev();
      if (event.key === "ArrowRight" && hasMultiple) goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, goPrev, goNext, hasMultiple]);

  return (
    <div className="catalog-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="catalog-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalog-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="catalog-modal-close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="catalog-modal-gallery">
          <div className="catalog-modal-stage">
            {hasMultiple ? (
              <>
                <button
                  type="button"
                  className="catalog-modal-nav catalog-modal-nav-prev"
                  aria-label="Предыдущее"
                  onClick={goPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="catalog-modal-nav catalog-modal-nav-next"
                  aria-label="Следующее"
                  onClick={goNext}
                >
                  ›
                </button>
              </>
            ) : null}

            {current?.type === "video" ? (
              <video
                key={current.src}
                className="catalog-modal-video"
                src={current.src}
                poster={current.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={galleryLabel(current, index, item.name)}
              />
            ) : (
              <img
                key={current?.src}
                src={current?.src ?? item.cover}
                alt={galleryLabel(
                  current ?? { type: "image", src: item.cover },
                  index,
                  item.name,
                )}
                className="catalog-modal-image"
              />
            )}
          </div>

          {hasMultiple ? (
            <div className="catalog-modal-thumbs">
              {item.gallery.map((media, i) => (
                <button
                  key={`${media.type}-${media.src}`}
                  type="button"
                  className={`catalog-modal-thumb${i === index ? " active" : ""}${media.type === "video" ? " is-video" : ""}`}
                  aria-label={galleryLabel(media, i, item.name)}
                  onClick={() => setIndex(i)}
                >
                  {media.type === "video" ? (
                    <>
                      <img
                        src={media.poster ?? item.cover}
                        alt=""
                        className="catalog-modal-thumb-poster"
                      />
                      <span className="catalog-modal-thumb-play" aria-hidden>
                        ▶
                      </span>
                    </>
                  ) : (
                    <img src={media.src} alt="" />
                  )}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="catalog-modal-body">
          <div className="catalog-modal-head">
            <span className="tag">{item.catLabel}</span>
            <h3 id="catalog-modal-title">{item.name}</h3>
            <p className="material">{item.mat}</p>
          </div>
          <p className="catalog-modal-desc">{item.description}</p>
          <div className="catalog-modal-foot">
            <span className="price-pill">по договорённости</span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onDiscuss}
            >
              Написать →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
