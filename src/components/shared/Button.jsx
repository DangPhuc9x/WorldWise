import styles from "./Button.module.css";

/* eslint-disable react/prop-types */

function Button(props) {
  const { children, onClick, type } = props;
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
