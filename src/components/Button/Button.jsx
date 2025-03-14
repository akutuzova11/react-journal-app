import styles from "./Button.module.css";

export const Button = ({ onClick, disabled, ...props }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${styles.button} ${styles["button--accent"]}`}
        {...props}
        disabled={disabled}
      >
        Save
      </button>
    </>
  );
};
