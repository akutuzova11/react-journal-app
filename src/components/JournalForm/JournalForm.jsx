import styles from "./JournalForm.module.css";
import { Button } from "../Button/Button";
import { useEffect, useReducer } from "react";
import classNames from "classnames";
import { initialState, formReducer } from "./JournalForm.state";

export const JournalForm = ({ onSubmit }) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
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
        <input
          type="text"
          onChange={onChange}
          value={values.title}
          name="title"
          className={classNames(styles["input-title"], {
            [styles["invalid"]]: !isValid.title,
          })}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <span>Date</span>
        </label>
        <input
          type="date"
          onChange={onChange}
          value={values.date}
          name="date"
          id="date"
          className={classNames(styles["input"], {
            [styles["invalid"]]: !isValid.date,
          })}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <span>Tags</span>
        </label>
        <input
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
