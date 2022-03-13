import { LoginForm } from "../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";
export function LoginPage() {
  return (
    <section>
      <h1>Innskráning</h1>
      <LoginForm />
      <Link to="/" className="link">
        Til baka
      </Link>
    </section>
  );
}
