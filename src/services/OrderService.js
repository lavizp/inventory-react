import http from "../api/http-common";

const getAllOrders = () => {
  return http.get("/orders");
};
const createOrder = (data) => {
  const { products: items, customerId: customerNumber } = data;

  // console.log("Itens", items);
  // console.log("Itens", customerNumber);

  const newOrder = {
    items: [],
    customerNumber: customerNumber,
  };
  for (const item of items) {
    newOrder.items.push({
      productId: item._id,
      amount: item.quantity,
    });
  }

  return http.post("/orders", newOrder);
};

const getSingleOrder = (id) => {
  return http.get(`/orders/${id}`);
};

const OrderService = {
  getAllOrders,
  createOrder,
  getSingleOrder,
};

export default OrderService;
