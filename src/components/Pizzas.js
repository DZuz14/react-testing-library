import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Pizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPizzas = async () => {
    try {
      const res = await axios.get(
        'https://gist.githubusercontent.com/DZuz14/fd1c7e17f5929dc12f3d0406ce5888b2/raw/1910b3ce56284cc0eeb9c90b8961f6a468aa3dec/pizzas.json'
      );
      setPizzas(res.data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}

      {error && <p>Failed to fetch pizzas.</p>}

      <ul>
        {pizzas.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
