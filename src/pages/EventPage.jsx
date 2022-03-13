import { Loading } from "../components/Loading/Loading";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Event } from "../components/Event/Event";

const apiUrl = process.env.REACT_APP_API_URL;

export function EventPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      let json;
      const url = new URL(`/events/${id}`, apiUrl);
      try {
        const result = await fetch(url);
        if (result.status === 404) {
          setNotFound(true);
          return;
        }
        if (!result.ok) {
          throw new Error("Error fetching event");
        }
        json = await result.json();
      } catch (e) {
        console.warn("Unable to fetch event", e);
        setError("Ekki tókst að sækja viðburð");
        return;
      } finally {
        setLoading(false);
      }
      console.log(json);
      setEvent(json);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Villa kom upp: {error}</p>;
  }
  if (notFound) {
    return <NotFound />;
  }
  return <Event event={event} />;
}
