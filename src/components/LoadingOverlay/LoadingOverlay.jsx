import styles from "./LoadingOverlay.module.css";
import gif from "../../assets/loading.gif";

export const LoadingOverlay = () => {
  return (
    <div className={styles["loading"]}>
      <img className={styles["loading__gif"]} src={gif} alt="Loading..." />
    </div>
  );
};

export default LoadingOverlay;
