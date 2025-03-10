import styles from "./Button.module.css";

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles.accent}`}>
      Save
    </button>
  );
};
