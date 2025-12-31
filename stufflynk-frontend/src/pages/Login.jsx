import { useState } from "react";
import { login } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      const token = res.data.token;

      // Guardamos el token en localStorage
      localStorage.setItem("token", token);

      setMessage("Login exitoso ✅");
      console.log("Token guardado:", token);
    } catch (err) {
      setMessage("Error en login ❌");
    }
  };

  return (
    <div>
      <h2>Login Stufflynk</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
