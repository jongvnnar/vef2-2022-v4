import { useContext } from "react";
import { AuthContext } from "../../App";
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
const FAKE_USER = "test";
export function Footer() {
  const { user, setUser } = useContext(AuthContext);
  if (user) {
    return (
      <>
        <p className={styles.user__loggedin}>
          Innskráður sem: <strong>{user}</strong>
        </p>
        <Button onClick={() => setUser(null)}>Útskrá</Button>
      </>
    );
  }
  return (
    <>
      <Link to="/login">Innskráning</Link>
      <Button onClick={() => setUser(FAKE_USER)} margin>
        Nýskráning
      </Button>
    </>
  );
}
