import css from "./Loader.module.css";
import { SyncLoader } from "react-spinners";

export default function Loader() {
  return <SyncLoader className={css.loader} />;
}