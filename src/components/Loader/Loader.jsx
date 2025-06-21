import { SyncLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return <SyncLoader className={css.loader} />;
}