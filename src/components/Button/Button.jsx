import "./Button.css";

export const Button = ({ text, onClick }) => {
  return <button onClick={onClick} className="button accent">{text}</button>;
};
