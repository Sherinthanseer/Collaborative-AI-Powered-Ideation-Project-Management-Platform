import React, { useState } from "react";
import InputField from "../atoms/InputField";
import Button from "../atoms/button";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login with\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md bg-white rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;
