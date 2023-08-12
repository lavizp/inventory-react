import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";

const useProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateProducts = (data) => {
    setProducts(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error, updateProducts };
};

export default useProductFetch;
