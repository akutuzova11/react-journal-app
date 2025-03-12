import styles from "./JournalForm.module.css";
import { Button } from "../Button/Button";
import { useContext, useEffect, useReducer, useRef } from "react";
import classNames from "classnames";
import { initialState, formReducer } from "./JournalForm.state";
import { Input } from "../Input/input";
import { UserContext } from "../../context/userContext";
import Archive from "../../assets/trash.svg";
import CalendarIcon from "../../assets/calendar.svg"
import TagIcon from "../../assets/tag.svg"

export const JournalForm = ({ onSubmit, data, onDelete }) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const { isValid, isFormReadyToSubmit, values } = formState;
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
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "resetValidity" });
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "clear" });
      dispatchForm({ type: "setValue", payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: "setValue",
      payload: { userId },
    });
  }, [userId]);

  const onChange = (event) => {
    dispatchForm({
      type: "setValue",
      payload: { [event.target.name]: event.target.value },
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

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
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
        <img className={styles["calendar-icon"]} src={CalendarIcon} alt="calendar icon" />
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
      <Button />
    </form>
  );
};
