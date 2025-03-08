import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { JournalAdd } from "./components/JournalAdd/JournalAdd";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { JournalList } from "./components/JournalList/JournalList";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { RightPanel } from "./layout/RightPanel/RightPanel";
import styles from "./App.module.css";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setItems(
        data.map((item) => ({
          ...item,
          date: new Date(item.date),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("data", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item) => {
    setItems((prev) => [
      ...prev,
      {
        title: item.title,
        date: new Date(item.date),
        post: item.post,
        id: Math.max(...prev.map((item) => item.id)) + 1,
      },
    ]);
  };

  return (
    <div className={styles["app"]}>
      <LeftPanel>
        <Header />
        <JournalAdd />
        <JournalList items={items} />
      </LeftPanel>
      <RightPanel>
        <JournalForm onSubmit={addItem} />
      </RightPanel>
    </div>
  );
}

export default App;
