import style from './button.module.css';
const Button = ({ type, onClick, isDisabled = false, text }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`${style.button_div} ${style[type]}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
export default Button;
