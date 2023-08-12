import http from "../api/http-common";

const getAllCustomers = () => {
  return http.get("/customers");
};
const createCustomer = (data) => {
  return http.post("/customers", data);
};

const getSingleCustomer = (_id) => {
  return http.get(`/customers/${_id}`);
};
const updateCustomer = ({ _id, data }) => {
  const { name, address, phone } = data[0];
  data = {
    name,
    address,
    phone,
  };
  return http.patch(`/customers/${_id}`, data);
};
const deleteCustomer = (_id) => {
  return http.delete(`/customers/${_id}`);
};
const CustomerService = {
  getAllCustomers,
  createCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};

export default CustomerService;
