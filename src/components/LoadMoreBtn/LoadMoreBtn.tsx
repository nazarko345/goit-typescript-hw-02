import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onChange: () => void;
}

export default function LoadMoreBtn({ onChange }: LoadMoreBtnProps) {
  return (
    <>
      <button type="button" onClick={onChange} className={css.button}>
        Load More
      </button>
    </>
  );
}
