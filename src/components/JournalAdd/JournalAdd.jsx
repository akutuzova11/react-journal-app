import { CardButton } from "../CardButton/CardButton";
import styles from "./JournalAdd.module.css";
import Plus from "../../assets/plus.svg";

export const JournalAdd = ({ clearForm }) => {
  return (
    <CardButton className={styles["journal-add"]} onClick={clearForm}>
      <img src={Plus} alt="plus" className={styles["journal-add__plus"]} />
      <span className={styles["journal-add__text"]}>New memory</span>
    </CardButton>
  );
};
