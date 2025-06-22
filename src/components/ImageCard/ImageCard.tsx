import css from "./ImageCard.module.css";
import React from "react";

interface ImageCardProps {
  image: string;
  description: string;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  description,
  onClick,
}) => {
  return (
    <div className={css.imgContainer}>
      <img
        className={css.img}
        src={image}
        alt={description}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;
