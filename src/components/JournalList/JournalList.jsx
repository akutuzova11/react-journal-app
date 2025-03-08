import { CardButton } from "../CardButton/CardButton";
import { JournalItem } from "../JournalItem/JournalItem";
import "./JournalList.css";

export const JournalList = ({ items=[] }) => {
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
      {items.sort(sortItems).map((element) => (
        <CardButton key={element.id}>
          <JournalItem
            title={element.title}
            date={element.date}
            text={element.text}
          />
        </CardButton>
      ))}
    </div>
  );
};
