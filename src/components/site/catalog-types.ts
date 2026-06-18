export type CatalogGalleryItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string; alt?: string };

export type FeaturedCatalogItem = {
  id: string;
  name: string;
  mat: string;
  catLabel: string;
  description: string;
  cover: string;
  gallery: CatalogGalleryItem[];
  featured?: boolean;
};
