import { useState } from "react";

function Form() {
  const [title, setTitle] = useState("Form");
  const [username, setUsername] = useState("");

  return (
    <div className="Form">
      <h1>{title}</h1>
      <input value={username} onInput={(e) => setUsername(e.target.value)} />
    </div>
  );
}

export default Form;
