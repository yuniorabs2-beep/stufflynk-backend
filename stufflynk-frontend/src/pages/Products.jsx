import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import Loader from "../components/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2>Productos Stufflynk</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price} USD
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
