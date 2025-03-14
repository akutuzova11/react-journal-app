import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import styles from "./SelectUser.module.css";

export const SelectUser = () => {
  const { userId, setUserId } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDown = () => setIsOpen(!isOpen);

  const changeUser = (id) => {
    setUserId(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedUser =
  userId === 1 ? "User Profile: Anna" : "User Profile: Mark";

  return (
    <div className={styles["custom-dropdown"]} ref={dropdownRef}>
      <div className={styles["custom-dropdown__selected"]} onClick={toggleDown}>
        {selectedUser}
      </div>
      {isOpen && (
        <div className={styles["custom-dropdown__options"]}>
          <div className={styles["custom-dropdown__option"]} onClick={() => changeUser(1)}>
            Anna
          </div>
          <div className={styles["custom-dropdown__option"]} onClick={() => changeUser(2)}>
            Mark
          </div>
        </div>
      )}
    </div>
  );
};
