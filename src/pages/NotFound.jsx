import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <section>
      <h1>Error: 404</h1>
      <h3>Síða fannst ekki</h3>
      <Link to="/" className="link">
        Til baka á forsíðu
      </Link>
    </section>
  );
}
