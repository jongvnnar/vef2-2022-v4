import { Login } from "../components/Login/Login";
import { Link } from "react-router-dom";
export function LoginPage() {
  return (
    <section>
      <h1>Innskráning</h1>
      <Login />
      <Link to="/" className="link">
        Til baka
      </Link>
    </section>
  );
}
