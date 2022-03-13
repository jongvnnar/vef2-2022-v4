import { useEffect, useState } from "react";
import { Loading } from "../components/Loading/Loading";
import { Events } from "../components/Events/Events";

const apiUrl = process.env.REACT_APP_API_URL;

export function Index() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      const url = new URL("/events", apiUrl);
      try {
        const result = await fetch(url);
        if (!result.ok) {
          throw new Error("Error fetching events");
        }
        json = await result.json();
      } catch (e) {
        console.warn("Unable to fetch events", e);
        setError("Ekki tókst að sækja viðburði");
        return;
      } finally {
        setLoading(false);
      }

      setEvents(json.items);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return <Events events={events} />;
}
