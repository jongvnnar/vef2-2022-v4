import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function RegistrationForm({ registrations, setRegistrations }) {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  if (!user) {
    return <></>;
  }
  const isRegistered = () => {
    for (const entry of registrations) {
      if (entry.name === user) {
        return true;
      }
    }
    return false;
  };
  if (isRegistered()) {
    return <p>Þú hefur skráð þig á þennan viðburð</p>;
  }
  const onSubmit = () => {
    setRegistrations([...registrations, { name: user, comment }]);
  };
  return (
    <Form buttonName="Skrá mig" onSubmit={onSubmit}>
      <Input
        label="Athugasemd:"
        name="comment"
        value={comment}
        setValue={setComment}
        textarea
      />
    </Form>
  );
}
