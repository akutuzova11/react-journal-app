import "./JournalItem.css";

export const JournalItem = ({ title, date, post }) => {
  const formatedDate = new Intl.DateTimeFormat("pl-PL").format(date);

  return (
    <>
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{formatedDate}</div>
        <div className="journal-item__post">{post}</div>
      </h2>
    </>
  );
};
