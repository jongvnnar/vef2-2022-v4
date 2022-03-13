import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
export function Layout({ title, footer }) {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <h1>{title}</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className={styles.layout__footer}>{footer}</footer>
    </div>
  );
}
