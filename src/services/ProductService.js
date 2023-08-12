import http from "../api/http-common";

const getAllProducts = () => {
  return http.get("/product");
};
const createProduct = (data) => {
  return http.post("/product", data);
};

const getSingleProduct = (_id) => {
  return http.get(`/product/${_id}`);
};
const updateProduct = ({ _id, data }) => {
  const { name, sellingPrice, costPrice, profit, expiryDate, quantity } =
    data[0];
  data = {
    name,
    sellingPrice,
    costPrice,
    profit,
    expiryDate,
    quantity,
  };
  return http.patch(`/product/${_id}`, data);
};
const deleteProduct = (_id) => {
  return http.delete(`/product/${_id}`);
};
const addQuantity = ({ _id, quantity }) => {
  console.log(_id, quantity);
  const data = {
    quantity,
  };
  return http.patch(`/product/quantity/${_id}`, data);
};
const ProductService = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  addQuantity,
};

export default ProductService;
