import { Header } from "./components/Header/Header";
import { JournalAdd } from "./components/JournalAdd/JournalAdd";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { JournalList } from "./components/JournalList/JournalList";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { RightPanel } from "./layout/RightPanel/RightPanel";
import styles from "./App.module.css";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";
import { UserContextProvider } from "./context/userContextProvider";
import { useState } from "react";

function mapItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((i) => ({ ...i, date: i.date ? new Date(i.date) : null }));
}

function App() {
  const [items, setItems] = useLocalStorage("data", []);
  const [selectedItem, setSelectedItem] = useState();

  const addItem = (item) => {
    const safeItems = Array.isArray(items) ? items : [];

    if (!item.id) {
      setItems([
        ...mapItems(safeItems),
        {
          ...item,
          date: new Date(item.date),
          id:
            safeItems.length > 0
              ? Math.max(...safeItems.map((item) => item.id)) + 1
              : 1,
        },
      ]);
    } else {
      setItems(
        ...mapItems(items).map((i) => {
          if ((i.id = item.id)) {
            return {
              ...item,
              date: new Date(item.date),
            };
          } else {
            return i;
          }
        })
      );
    }
  };

  return (
    <>
      <UserContextProvider>
        <div className={styles["app"]}>
          <LeftPanel>
            <Header />
            <JournalAdd />
            <JournalList items={mapItems(items)} setItem={setSelectedItem} />
          </LeftPanel>
          <RightPanel>
            <JournalForm onSubmit={addItem} data={selectedItem} />
          </RightPanel>
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
