import { LoginForm } from "../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";
export function LoginPage() {
  return (
    <section>
      <h2>Innskráning</h2>
      <LoginForm />
      <Link to="/" className="link">
        Til baka
      </Link>
    </section>
  );
}
