import { Header } from "./components/Header/Header";
import { JournalAdd } from "./components/JournalAdd/JournalAdd";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { JournalList } from "./components/JournalList/JournalList";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { RightPanel } from "./layout/RightPanel/RightPanel";
import styles from "./App.module.css";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [items, setItems] = useLocalStorage("data", []);

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        title: item.title,
        date: new Date(item.date),
        post: item.post,
        id:
          items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className={styles["app"]}>
      <LeftPanel>
        <Header />
        <JournalAdd />
        <JournalList items={mapItems(items)} />
      </LeftPanel>
      <RightPanel>
        <JournalForm onSubmit={addItem} />
      </RightPanel>
    </div>
  );
}

export default App;
