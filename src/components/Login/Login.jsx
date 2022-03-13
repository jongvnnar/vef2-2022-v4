import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [passError, setPassError] = useState(false);
  const { setUser } = useContext(AuthContext);
  const validateUsername = (input) => {
    if (!input || input.length > 64) {
      setErrors([...errors, "Notendanafns er krafist, hámark 64 stafir"]);
      setNameError(true);
      return false;
    } else {
      setNameError(false);
      return true;
    }
  };
  const validatePassword = (password) => {
    if (!password || password.length > 256) {
      setErrors([...errors, "Lykilorðs er krafist, hámark 64 stafir"]);
      setPassError(true);
      return false;
    } else {
      setPassError(false);
      return true;
    }
  };
  //gervistöff til að skrá sig inn með notanda sem breytir í raun bara nafni
  const onSubmit = () => {
    const validUser = validateUsername(username);
    const validPassword = validatePassword(password);
    if (!validUser || !validPassword) return;
    setUser(username);
  };
  console.log(passError);
  return (
    <Form onSubmit={onSubmit} buttonName="Innskrá">
      <Input
        label="Notendanafn"
        name="username"
        value={username}
        setValue={setUsername}
        isError={nameError}
      />
      <Input
        label="Lykilorð"
        name="password"
        value={password}
        setValue={setPassword}
        type="password"
        isError={passError}
      />
    </Form>
  );
}
