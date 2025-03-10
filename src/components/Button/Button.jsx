import "./Button.css";

export const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="button accent">
      Save
    </button>
  );
};
