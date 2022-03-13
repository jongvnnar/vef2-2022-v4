import styles from "./Input.module.scss";
import { useEffect, useState } from "react";
export function Input({
  label,
  name,
  value,
  setValue,
  isError = false,
  textarea = false,
  type = "text",
}) {
  const [classes, setClasses] = useState([styles.field]);
  useEffect(() => {
    if (textarea && !classes.includes(styles["field--textarea"])) {
      setClasses([...classes, styles["field--textarea"]]);
    }
    if (isError && !classes.includes(styles["field--invalid"])) {
      setClasses([...classes, styles["field--invalid"]]);
    }
    if (!isError && classes.includes(styles["field--invalid"])) {
      setClasses(
        [...classes].filter((item) => item !== styles["field--invalid"])
      );
    }
  }, [textarea, isError, classes, setClasses]);
  return (
    <div className={classes.join(" ")}>
      <label htmlFor={name}>{label}</label>
      {!textarea ? (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
    </div>
  );
}
