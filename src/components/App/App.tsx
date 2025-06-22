import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar.tsx";
import ImageGallery from "../ImageGallery/ImageGallery.tsx";
import ImageModal from "../ImageModal/ImageModal.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import { fetchArticles } from "../../articles-api.ts";

import { useEffect, useState, type FormEvent} from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.js';
import type { Image } from "../../types.js";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<Image[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Image | null>(null);


  useEffect(() => {
    if (query === "") {
      return;
    }

    async function loadArticles() {
      try {
        setLoader(true);
        setIsError(false);
        const data = await fetchArticles(query, page);
        setArticles((prevPhotos) => {
          return page === 1 ? data.results : [...prevPhotos, ...data.results];
        });
        setTotalArticles(data.total);
      } catch {
        setIsError(true);
        toast.error("An error occured! Please try again later.");
      } finally {
        setLoader(false);
      }
    }

    loadArticles();
  }, [query, page]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const input = form.elements.namedItem("search") as HTMLInputElement;

    const topic = input?.value.trim();
    if (topic === "") {
      toast.error("Please enter a search term!");
      return;
    }

    setQuery(topic);
    setTotalArticles(0);
    setPage(1);
    setArticles([]);

    form.reset();
  }

  function moreArticlesRender() {
    setPage(page + 1);
  }

  function OpenModal(article: Image) {
    setModalIsOpen(true);
    setSelectedArticle(article);
  }

  function CleseModal() {
    setModalIsOpen(false);
    setSelectedArticle(null);
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {loader && <Loader />}
      {articles.length > 0 && (
        <ImageGallery modalOpening={OpenModal} articles={articles} />
      )}
      {isError && <ErrorMessage />}
      {articles.length > 0 && articles.length < totalArticles && (
        <LoadMoreBtn onChange={moreArticlesRender} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        isClosed={CleseModal}
        selectedArticle={selectedArticle}
      />
      <Toaster position="top-right" />
    </div>
  );
}
