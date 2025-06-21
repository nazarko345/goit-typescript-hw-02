import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { BsXLg } from "react-icons/bs"; 

Modal.setAppElement("#root");

export default function ImageModal({ isOpen, isClosed, selectedArticle }) {
  return (
    <Modal className={css.modal} isOpen={isOpen} onRequestClose={isClosed}>
      {selectedArticle && (
        <>
          <button onClick={isClosed}>
            <BsXLg />
          </button>
          <img
            className={css.img}
            src={selectedArticle.urls.regular}
            alt={selectedArticle.alt_description}
          />
          <div className={css.miniContainer}>
            <h4 className={css.description}>
              {" "}
              {selectedArticle.description ||
                selectedArticle.alt_description ||
                "No description available"}
            </h4>
            <p className={css.likes}>❤️ {selectedArticle.likes}</p>
          </div>
        </>
      )}
    </Modal>
  );
}

