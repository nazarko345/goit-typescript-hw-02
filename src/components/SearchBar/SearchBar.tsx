import css from "./SearchBar.module.css";
import React from "react";

interface SearchBarProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
