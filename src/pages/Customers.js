import React, { useState, useEffect, useContext } from "react";
import CustomerService from "../services/CustomerService";
import SingleCustomer from "../components/Customers/SingleCustomer";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import SideNav from "../components/SideNav";
const Customers = () => {
  const { user } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const addCustomer = () => {
    setCustomers((prevCustomers) => {
      const newCustomer = {
        _id: "new",
        name: "",
        address: "",
        contact: "",
        isEdit: true,
      };
      return [newCustomer, ...prevCustomers];
    });
  };

  useEffect(() => {
    retrieveCustomers();
  }, [currentPage]);

  const retrieveCustomers = () => {
    CustomerService.getAllCustomers()
      .then((response) => {
        const data = response.data.map((customer) => ({
          ...customer,
          isEdit: false,
        }));
        setCustomers(data);

        const totalPages = Math.ceil(data.length / 10);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const renderedCustomers = currentCustomers.map((customer) => (
    <SingleCustomer
      key={customer._id}
      {...customer}
      setCustomers={setCustomers}
      retrieveCustomer={retrieveCustomers}
    />
  ));

  return (
    <>
      <div className="flex gap-10 bg-slate-200">
        <SideNav />
        <div className="table-responsive h-[100vh]">
          <div className="table-wrapper bg-white text-black">
            <div className="table-title">
              <div className="flex  justify-between">
                <div className="col-sm-4">
                  <h2>
                    Customers <b>Details</b>
                  </h2>
                </div>
                <div className="search-bar col-sm-4 ">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search Customer"
                    className="border-2 rounded-md px-2"
                  />
                </div>
                <button
                  type="button"
                  className="flex items-center border-2 rounded-md p-2 gap-2"
                  onClick={addCustomer}
                >
                  <FaPlus />
                  Add New
                </button>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Contact</th>
                  {/* {user.role === "manager" && <th>Actions</th>} */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderedCustomers}</tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={`btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customers;
