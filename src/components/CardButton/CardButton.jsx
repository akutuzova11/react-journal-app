import { useState, useCallback } from "react";
import styles from "./CardButton.module.css";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay.jsx";

export const CardButton = ({ children, className, onClick, ...props }) => {
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

  const cl = `${styles["card-button"]} ${className || ""}`.trim();

  return (
    <>
      <button {...props} className={cl} onClick={handleClick}>
        {children}
      </button>
      {isLoading && <LoadingOverlay />}
    </>
  );
};
