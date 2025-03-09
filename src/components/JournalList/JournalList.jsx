import { useContext } from "react";
import { CardButton } from "../CardButton/CardButton";
import { JournalItem } from "../JournalItem/JournalItem";
import "./JournalList.css";
import { UserContext } from "../../context/userContext";

export const JournalList = ({ items = [] }) => {
  const { userId } = useContext(UserContext);

  if (!items.length) {
    return <p>No memories, add the first one</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else return -1;
  };

  return (
    <div className="journal-list">
      {items
        .filter((element) => element.userId === userId)
        .sort(sortItems)
        .map((element) => (
          <CardButton key={element.id}>
            <JournalItem
              title={element.title}
              date={element.date}
              post={element.post}
            />
          </CardButton>
        ))}
    </div>
  );
};
