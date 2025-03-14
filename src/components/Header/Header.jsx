import { SelectUser } from "../SelectUser/SelectUser";
import styles from "./Header.module.css";
import Logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <>
      <img src={Logo} alt="logo" className={styles["header__logo"]} />
      <SelectUser />
    </>
  );
};
