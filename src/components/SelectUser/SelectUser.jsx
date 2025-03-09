import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export const SelectUser = () => {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (event) => {
    setUserId(Number(event.target.value));
  };
  return (
    <select name="user" value={userId} id="user" onChange={changeUser}>
      <option value="1">Anna</option>
      <option value="2">Mark</option>
    </select>
  );
};
