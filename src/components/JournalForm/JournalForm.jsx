import styles from "./JournalForm.module.css";
import { Button } from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import classNames from "classnames";
import { initialState, formReducer } from "./JournalForm.state";
import { Input } from "../Input/input";

export const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

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
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

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

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <Input
          type="text"
          onChange={onChange}
          ref={titleRef}
          isValid={isValid.title}
          value={values.title}
          name="title"
          appearance="title"
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <span>Date</span>
        </label>
        <Input
          type="date"
          onChange={onChange}
          ref={dateRef}
          isValid={isValid.date}
          value={values.date}
          name="date"
          id="date"
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
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
      <Button text="Save" />
    </form>
  );
};
