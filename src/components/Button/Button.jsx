import styles from "./Button.module.scss";
export function Button({ onClick, children, margin = false, large = false }) {
  const classes = [
    styles.button,
    margin ? styles["button--margin"] : "",
    large ? styles["button--large"] : "",
  ];
  return (
    <button className={classes.join(" ")} onClick={onClick}>
      {children}
    </button>
  );
}
