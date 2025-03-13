import styles from "./JournalForm.module.css";
import { Button } from "../Button/Button";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import classNames from "classnames";
import { initialState, formReducer } from "./JournalForm.state";
import { Input } from "../Input/input";
import { UserContext } from "../../context/userContext";
import Archive from "../../assets/trash.svg";
import CalendarIcon from "../../assets/calendar.svg";
import TagIcon from "../../assets/tag.svg";
import { LoadingOverlay } from "../LoadingOverlay/LoadingOverlay.jsx";

export const JournalForm = ({ onSubmit, data, onDelete }) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "clear" });
      dispatchForm({
        type: "setValue",
        payload: { userId },
      });
    } else {
      dispatchForm({
        type: "setValue",
        payload: { ...data },
      });
    }
  }, [data, userId]);

  useEffect(() => {
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit && isValid.title && isValid.date && isValid.post) {
      setIsLoading(true);
      onSubmit(values);
      dispatchForm({ type: "clear" });
      dispatchForm({ type: "setValue", payload: { userId } });
      setIsLoading(false);
      dispatchForm({ type: "resetSubmit" });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId, isValid]);

  useEffect(() => {
    dispatchForm({
      type: "setValue",
      payload: { userId },
    });
  }, [userId]);

  const onChange = (event) => {
    let { name, value } = event.target;

    if (name === "tag") {
      let words = value.split(/\s+/).filter(Boolean);

      words = words.map((word) => (word.startsWith("#") ? word : `#${word}`));

      value = words.join(" ") + (value.endsWith(" ") ? " " : "");
    }
    dispatchForm({
      type: "setValue",
      payload: { [name]: value },
    });
};

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "submit" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "clear" });
    dispatchForm({ type: "setValue", payload: { userId } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <form
      className={styles["journal-form"]}
      onSubmit={addJournalItem}
      onKeyDown={handleKeyDown}
    >
      {isLoading && <LoadingOverlay />}
      <div className={styles["form-row"]}>
        <Input
          type="text"
          onChange={onChange}
          ref={titleRef}
          isValid={isValid.title}
          value={values.title}
          name="title"
          appearance="title"
        />
        {data?.id && (
          <button
            className={styles["remove"]}
            type="button"
            onClick={deleteJournalItem}
          >
            <img src={Archive} alt="archive" />
          </button>
        )}
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img
            className={styles["calendar-icon"]}
            src={CalendarIcon}
            alt="calendar icon"
          />
          <span>Date</span>
        </label>
        <div className={styles["date-wrapper"]}>
          <Input
            type="date"
            onChange={onChange}
            ref={dateRef}
            isValid={isValid.date}
            value={
              values.date
                ? new Date(values.date).toISOString().slice(0, 10)
                : ""
            }
            name="date"
            id="date"
            className={styles["input-date"]}
          />
          <button
            type="button"
            className={styles["calendar-button"]}
            onClick={() => dateRef.current.showPicker()}
          >
            <div className={styles["calendar-add"]}></div>
          </button>
        </div>
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img className={styles["tag-icon"]} src={TagIcon} alt="tag icon" />
          <span>Tags</span>
        </label>
        <Input
          type="text"
          onChange={onChange}
          value={values.tag}
          name="tag"
          id="tag"
          className={styles["input"]}
        />
      </div>

      <textarea
        name="post"
        onChange={onChange}
        ref={postRef}
        value={values.post}
        id=""
        cols="30"
        rows="10"
        className={classNames(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
      ></textarea>
      <Button disabled={isLoading || !isValid.title || !isValid.date || !isValid.post}
        onClick={addJournalItem} />
    </form>
  );
};
