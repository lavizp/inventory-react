import React, { useEffect, useState } from "react";
import useProductFetch from "../hooks/useProductFetch";
import SideNav from "../components/SideNav";
import OrderService from "../services/OrderService";

const Home = () => {
  const { products, updateProducts } = useProductFetch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleProductSelect = (productId) => {
    const selectedProductIndex = selectedProducts.findIndex(
      (p) => p._id === productId
    );
    const productIndex = products.findIndex((p) => p._id === productId);

    if (selectedProductIndex !== -1) {
      const updatedSelectedProducts = [...selectedProducts];
      const selectedProduct = {
        ...updatedSelectedProducts[selectedProductIndex],
      };
      selectedProduct.quantity += 1;
      updatedSelectedProducts[selectedProductIndex] = selectedProduct;

      const updatedProducts = [...products];
      const product = { ...updatedProducts[productIndex] };
      product.quantity -= 1;
      updatedProducts[productIndex] = product;

      setSelectedProducts(updatedSelectedProducts);
      // setProducts(updatedProducts);
      updateProducts(updatedProducts);
    } else if (productIndex !== -1 && products[productIndex].quantity > 0) {
      const updatedSelectedProducts = [
        ...selectedProducts,
        { ...products[productIndex], quantity: 1 },
      ];
      const updatedProducts = [...products];
      const product = { ...updatedProducts[productIndex] };
      product.quantity -= 1;
      updatedProducts[productIndex] = product;

      setSelectedProducts(updatedSelectedProducts);
      // setProducts(updatedProducts);
      updateProducts(updatedProducts);
    }
  };
  const handleRemoveProduct = (productId) => {
    const updatedSelectedProducts = selectedProducts.map((p) =>
      p._id === productId ? { ...p, quantity: p.quantity - 1 } : p
    );
    const updatedFilteredProducts = products.map((p) =>
      p._id === productId ? { ...p, quantity: p.quantity + 1 } : p
    );

    setSelectedProducts(updatedSelectedProducts.filter((p) => p.quantity > 0));
    // setProducts(updatedFilteredProducts);
    updateProducts(updatedFilteredProducts);
  };

  const calculateTotal = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.sellingPrice * product.quantity;
    });
    return total;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.soldQuantity - a.soldQuantity)
    .slice(0, 10);

  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleCreateOrder = () => {
    // Submit order details and customer ID
    const order = {
      products: selectedProducts,
      customerId: customerId,
    };

    console.log(order);
    // You can make an API call here to send the order details to the server
    OrderService.createOrder(order)
      .then((res) => {
        setSelectedProducts([]);
        setCustomerId("");
        setSuccessMessageVisible(true); // Show success message
        setTimeout(() => {
          setSuccessMessageVisible(false); // Hide success message after 1 second
        }, 1000);
      })
      .catch((err) => {
        if (err) {
          setErrorMessage("Invalid customer id"); // Set error message
          setTimeout(() => {
            setErrorMessage(""); // Clear error message after 1 second
          }, 1000);
        }
      });

    // Reset selected products and customer ID
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleCreateOrder();
  };

  useEffect(() => {
    let timeout;
    if (successMessageVisible) {
      timeout = setTimeout(() => {
        setSuccessMessageVisible(false); // Hide success message after 1 second
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [successMessageVisible]);
  return (
    <div className="flex gap-10 bg-slate-200">
      <SideNav />
      <div className="h-[100vh]">
        {/* <h1 className="mb-4">Order Taking Page</h1> */}
        {/* ... */}
        {successMessageVisible && (
          <div className="alert alert-success mt-4" role="alert">
            Order created successfully!
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger mt-4" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="row bg-white mt-3 p-10">
          <div className="col-md-6 ">
            <h2 className="mb-2">Product List: </h2>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for a product"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <ul className="list-group">
              {filteredProducts.map((product, index) => (
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-center gap-2"
                >
                  <div>
                    <span className="product-number">{product.number}. </span>
                    {product.name} - Rs {product.sellingPrice}
                  </div>
                  <div>
                    <span className="badge bg-primary rounded-pill">
                      {product.quantity || 0}
                    </span>
                    <button
                      className="btn btn-sm btn-success me-2 ml-2"
                      onClick={() => handleProductSelect(product._id)}
                      disabled={product.quantity <= 0}
                    >
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-6">
            <h2>Selected Products</h2>
            <ul className="list-group">
              {selectedProducts.map((product) => (
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span className="product-number">{product.number}. </span>
                    {product.name} - Rs {product.sellingPrice} x{" "}
                    {product.quantity}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveProduct(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="mt-4">
              Total Payable Amount: Rs {calculateTotal()}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mt-4">
                <label htmlFor="customerId" className="form-label">
                  Customer ID:
                </label>
                {selectedProducts.length <= 0 ? (
                  <input
                    type="text"
                    id="customerId"
                    className="border-2 rounded-md text-black"
                    value={customerId}
                    onChange={handleCustomerIdChange}
                    disabled
                  />
                ) : (
                  <input
                    type="text"
                    id="customerId"
                    className="border-2 rounded-md text-black"
                    value={customerId}
                    onChange={handleCustomerIdChange}
                  />
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md mt-3"
                // onClick={handleCreateOrder}
              >
                Create Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
