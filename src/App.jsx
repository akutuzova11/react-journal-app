import { useState } from "react";
import { Header } from "./components/Header/Header";
import { JournalAdd } from "./components/JournalAdd/JournalAdd";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { JournalList } from "./components/JournalList/JournalList";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { RightPanel } from "./layout/RightPanel/RightPanel";
import styles from "./App.module.css";

const data = [
  {
    id: 1,
    title: "Get ready for course renewal",
    date: new Date(),
    text: "Simon Walker had always loved industrial Berlin with its bad, black beaches.",
  },
  {
    id: 2,
    title: "Mountain rail",
    date: new Date(),
    text: "They looked at each other with jumpy feelings...",
  },
];

function App() {
  const [items, setItems] = useState(data);

  const addItem = (item) => {
    setItems((prev) => [
      ...prev,
      {
        title: item.title,
        date: new Date(item.date),
        text: item.text,
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
