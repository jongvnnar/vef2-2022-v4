import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Events.module.scss";
export function Event({ event }) {
  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    if (event && event.registrations && event.registrations.length > 0) {
      setRegistrations(event.registrations);
    }
  }, [event, event?.registrations]);
  if (!event) {
    return <p>Engar upplýsingar fundust um þennan viðburð :(</p>;
  }
  return (
    <section>
      <div className={styles.event__info}>
        <h1 className={styles.event__title}>{event.name}</h1>
        <p className={styles.event__description}>{event.description}</p>
      </div>

      <div>
        {registrations.length === 0 ? (
          <p>Engin hefur skráð sig á þennan viðburð</p>
        ) : (
          <ul>
            {registrations.map((entry, index) => {
              return (
                <li
                  key={index.toString()}
                  className={styles.event__registeredItem}
                >
                  <span className={styles.event__registeredName}>
                    {entry.name}
                  </span>
                  {entry.comment && (
                    <span className={styles.event__registeredComment}>
                      {entry.comment}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Link className="link" to="/">
        Til baka
      </Link>
    </section>
  );
}
