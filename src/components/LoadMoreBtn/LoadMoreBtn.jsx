import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onChange }) {
  return (
    <button onClick={onChange} className={css.button}  type="submit">
      Load more
    </button>
  );
}
