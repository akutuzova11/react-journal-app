import styles from "./LeftPanel.module.css";

export const LeftPanel = ({ children }) => {
  return <div className={styles["left-panel"]}>{children}</div>;
};
