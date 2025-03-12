import { useState, useCallback } from "react";
import styles from "./Button.module.css";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay.jsx"; // Create this component

export const Button = ({ onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(
    async (event) => {
      setIsLoading(true);
      try {
        if (onClick) {
          await onClick(event);
        }
        await new Promise((resolve) => setTimeout(resolve, 1800));
      } finally {
        setIsLoading(false);
      }
    },
    [onClick]
  );

  return (
    <>
      <button
        onClick={handleClick}
        className={`${styles.button} ${styles.accent}`}
        {...props}
      >
        Save
      </button>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
