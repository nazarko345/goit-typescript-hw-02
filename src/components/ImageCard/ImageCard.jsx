import css from "./ImageCard.module.css";

export default function ImageCard({ image, description, onClick }) {
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
}