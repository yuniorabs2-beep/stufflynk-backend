import { useEffect, useState } from "react";
import { getUsers, getProducts, getDeals, getServices } from "../services/api";
import Loader from "../components/Loader";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    deals: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, dealsRes, servicesRes] = await Promise.all([
          getUsers(),
          getProducts(),
          getDeals(),
          getServices(),
        ]);

        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          deals: dealsRes.data.length,
          services: servicesRes.data.length,
        });
      } catch (err) {
        console.error("Error al obtener estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Dashboard Stufflynk</h2>
      <ul>
        <li>Usuarios: {stats.users}</li>
        <li>Productos: {stats.products}</li>
        <li>Deals: {stats.deals}</li>
        <li>Servicios: {stats.services}</li>
      </ul>
    </div>
  );
}

export default Dashboard;
