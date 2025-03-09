import { SelectUser } from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

export const Header = () => {

  return (
    <>
      <div className={styles.logo}>Logo</div>
      <SelectUser />
    </>
  );
};
