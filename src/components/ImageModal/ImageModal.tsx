import css from "./ImageModal.module.css";
import Modal from "react-modal";
import { BsXLg } from "react-icons/bs"; 

Modal.setAppElement("#root");

interface ImageUser {
  name: string;
}

interface SelectedImage {
  urls: {
    regular: string;
  };
  description?: string;
  alt_description: string | null;
  user: ImageUser;
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  isClosed: () => void;
  selectedArticle: SelectedImage | null;
}

export default function ImageModal({ isOpen, isClosed, selectedArticle }: ImageModalProps) {
  return (
    <Modal className={css.modal} isOpen={isOpen} onRequestClose={isClosed}>
      {selectedArticle && (
        <>
          <button type="button" onClick={isClosed}>
            <BsXLg />
          </button>
          <img
            className={css.img}
            src={selectedArticle.urls.regular}
            alt={selectedArticle.alt_description || "Image"}
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

