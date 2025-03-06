import { CardButton } from "./components/CardButton/CardButton";
import { Header } from "./components/Header/Header";
import { JournalAdd } from "./components/JournalAdd/JournalAdd";
import { JournalForm } from "./components/JournalForm/JournalForm";
import { JournalItem } from "./components/JournalItem/JournalItem";
import { JournalList } from "./components/JournalList/JournalList";
import { LeftPanel } from "./layout/LeftPanel/LeftPanel";
import { RightPanel } from "./layout/RightPanel/RightPanel";

function App() {
  const data = [
    {
      title: "Get ready for course renewal",
      date: new Date(),
      text: "Simon Walker had always loved industrial Berlin with its bad, black beaches.",
    },
    {
      title: "Mountain rail",
      date: new Date(),
      text: "They looked at each other with jumpy feelings...",
    },
  ];

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAdd />
        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              date={data[0].date}
              text={data[0].text}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[1].title}
              date={data[1].date}
              text={data[1].text}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <RightPanel>
        <JournalForm />
      </RightPanel>
    </div>
  );
}

export default App;
