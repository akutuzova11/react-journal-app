import { CardButton } from "../CardButton/CardButton";
import "./JournalAdd.css";

export const JournalAdd = ({ clearForm }) => {
  return (
    <CardButton className="journal-add" onClick={clearForm}>
      New memory
    </CardButton>
  );
};
