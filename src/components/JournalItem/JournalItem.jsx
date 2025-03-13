import styles from "./JournalItem.module.css";

export const JournalItem = ({ title, date, post, tag }) => {
  const formatedDate = new Intl.DateTimeFormat("pl-PL").format(date);

  return (
    <>
      <h2 className={styles["journal-item__header"]}>{title}</h2>
      <p className={styles["journal-item__tag"]}>{tag}</p>
      <h2 className={styles["journal-item__body"]}>
        <div className={styles["journal-item__date"]}>{formatedDate}</div>
        <div className={styles["journal-item__post"]}>{post}</div>
      </h2>
    </>
  );
};
