import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Borramos el token al cerrar sesión
    localStorage.removeItem("token");
    // Redirigimos al login
    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h2>Cerrando sesión...</h2>
    </div>
  );
}

export default Logout;
