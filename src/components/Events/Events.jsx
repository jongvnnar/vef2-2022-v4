import { Link } from "react-router-dom";
import styles from "./Events.module.scss";
export function Events({ events }) {
  return (
    <section className={styles.events}>
      <h2>Viðburðir á næstunni</h2>
      {events.length !== 0 ? (
        <ul>
          {events.map((event) => {
            return (
              <li className={styles.events__event}>
                <Link
                  to={`/${event.slug}`}
                  className={styles.events__eventLink}
                >
                  {event.name}
                </Link>
                <p className={styles.events__eventDescription}>
                  {event.description}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Engir viðburðir á næstunni!</p>
      )}
    </section>
  );
}
