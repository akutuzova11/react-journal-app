import { useContext } from "react";
import { CardButton } from "../CardButton/CardButton";
import { JournalItem } from "../JournalItem/JournalItem";
import styles from "./JournalList.module.css";
import { UserContext } from "../../context/userContext";
import AddNewMemory from "../../assets/AddNewMemories9.png";

export const JournalList = ({ items = [], setItem }) => {
  const { userId } = useContext(UserContext);

  if (!items.length) {
    return (
      <div className={styles["journal-memories"]}>
        <p className={styles["journal-text"]}>Every great story starts with a first line ...</p>
        <img className={styles["journal-image"]} src={AddNewMemory} alt="add new memory" />
      </div>
    );
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else return -1;
  };

  return (
    <div className={styles["journal-list"]}>
      {items
        .filter((element) => element.userId === userId)
        .sort(sortItems)
        .map((element) => (
          <CardButton key={element.id} onClick={() => setItem(element)}>
            <JournalItem
              title={element.title}
              tag = {element.tag}
              date={element.date}
              post={element.post}
            />
          </CardButton>
        ))}
    </div>
  );
};
