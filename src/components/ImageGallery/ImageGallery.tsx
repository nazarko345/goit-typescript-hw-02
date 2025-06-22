import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard.js";
import type { Image } from "../../types.js";

interface ImageGalleryProps {
  articles: Image[];
  modalOpening: (image: Image) => void;
}

export default function ImageGallery({
  articles,
  modalOpening,
}: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {articles.map((article) => (
        <li className={css.item} key={article.id}>
          <ImageCard
            description={article.alt_description}
            image={article.urls.small}
            onClick={() => modalOpening(article)}
          />
        </li>
      ))}
    </ul>
  );
}
