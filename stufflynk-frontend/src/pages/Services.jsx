import { useEffect, useState } from "react";
import { getServices } from "../services/api";
import Loader from "../components/Loader";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServices();
        setServices(res.data);
      } catch (err) {
        console.error("Error al obtener servicios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Servicios Stufflynk</h2>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            {service.name} - {service.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
