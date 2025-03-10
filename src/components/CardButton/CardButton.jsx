import styles from "./CardButton.module.css";

export const CardButton = ({ children, className, ...props }) => {
  const cl = `${styles["card-button"]} ${className || ""}`.trim();

  return (
    <button {...props} className={cl}>
      {children}
    </button>
  );
};
