import css from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar.jsx";
import ImageGallery from "../ImageGallery/ImageGallery.jsx";
import ImageModal from "../ImageModal/ImageModal.jsx";
import Loader from "../Loader/Loader.jsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import { fetchArticles } from "../../articles-api.js";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

export default function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isError, setIsError] = useState(false);

  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedArticle, setSelectedAtrticle] = useState(null);


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

  function handleSubmit(event) {
    event.preventDefault();

    const topic = event.target.elements[0].value.trim();
    if (topic === "") {
      toast.error("Please enter a search term!");
      return;
    }

    setQuery(topic);
    setTotalArticles(0);
    setPage(1);
    setArticles([]);

    event.target.reset();
  }

  function moreArticlesRender() {
    setPage(page + 1);
  }

  function OpenModal(article) {
    setModalIsOpen(true);
    setSelectedAtrticle(article);
  }

  function CleseModal() {
    setModalIsOpen(false);
    setSelectedAtrticle(null);
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
