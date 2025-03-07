import styles from "./RightPanel.module.css";

export const RightPanel = ({ children }) => {
  return <div className={styles["right-panel"]}>{children}</div>;
};
