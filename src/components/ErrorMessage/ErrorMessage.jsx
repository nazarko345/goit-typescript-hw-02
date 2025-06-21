import css from "./ErrorMessage.module.css";
import { MdErrorOutline } from "react-icons/md";

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <MdErrorOutline className={css.icon} />
        <h3 className={css.text}>Something went wrong with server! Please refresh the page or try again later</h3>
    </div>
  );
}