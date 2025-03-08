export const initialState = {
  isValid: {
    post: true,
    date: true,
    title: true,
  },
  values: {
    post: "",
    date: "",
    title: "",
    tag: "",
  },
  isFormReadyToSubmit: false,
};

export const formReducer = (prevState, action) => {
  switch (action.type) {
    case "setValue":
      return {
        ...prevState,
        values: { ...prevState.values, ...action.payload },
      };
    case "clear":
      return {
        ...prevState,
        values: initialState.values,
        isFormReadyToSubmit: false,
      };
    case "resetValidity":
      return { ...prevState, isValid: initialState.isValid };
    case "submit": {
      const postValidity = prevState.values.post?.trim().length > 0;
      const dateValidity = prevState.values.date;
      const titleValidity = prevState.values.title?.trim().length > 0;
      return {
        ...prevState,
        isValid: {
          post: postValidity,
          date: dateValidity,
          title: titleValidity,
        },
        isFormReadyToSubmit: postValidity && dateValidity && titleValidity,
      };
    }
    default:
      return prevState;
  }
};
