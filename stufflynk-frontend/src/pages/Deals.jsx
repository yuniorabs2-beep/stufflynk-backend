import { useEffect, useState } from "react";
import { getDeals } from "../services/api";
import Loader from "../components/Loader";

function Deals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDeals();
        setDeals(res.data);
      } catch (err) {
        console.error("Error al obtener deals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Deals Stufflynk</h2>
      <ul>
        {deals.map((deal) => (
          <li key={deal._id}>
            {deal.title} - {deal.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deals;
