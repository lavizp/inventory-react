import React, { useContext, useEffect, useState } from "react";

import StatsService from "../services/StatsService";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { AuthContext } from "../context/AuthContext";
import SideNav from "../components/SideNav";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log(user, "user");
  const [mostSoldProduct, setMostsoldProduct] = useState([]);
  const [lowStockProduct, setLowStockProduct] = useState([]);
  const [expiryProduct, setExpiryProduct] = useState([]);

  const getLowStock = () =>
    StatsService.lowstock().then((res) => {
      // console.log(res.data);
      const products = res.data.slice(0, 5);
      console.log(products, "products low");
      setLowStockProduct(products);
    });
  const getMostSold = () => {
    StatsService.mostSold().then((res) => {
      // console.log(res.data);
      const products = res.data.slice(0, 5);
      console.log(products, "products sold");
      setMostsoldProduct(products);
    });
  };
  const getExpiryProducts = () => {
    StatsService.expiryProducts().then((res) => {
      const products = res.data.slice(0, 5);
      setExpiryProduct(products);
    });
  };
  useEffect(() => {
    user && getLowStock();
    user && getMostSold();
    user && getExpiryProducts();
  }, [user]);

  return (
    <>
      <div className="flex gap-10 bg-slate-200">
        <SideNav />
        <div className="flex flex-col gap-5">
          <div className="p-8 bg-white mt-5">
            <h2 className="mb-2">
              <b>Low Stock Products</b>
            </h2>

            <table className="table border-3">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProduct &&
                  lowStockProduct.map((product) => {
                    const { _id, number, name, sellingPrice, quantity } =
                      product;
                    return (
                      <tr key={_id}>
                        <td>{number}</td>
                        <td>{name}</td>
                        <td>{quantity}</td>
                        <td>{sellingPrice}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* </div>
            </div> */}
          {/* <div className="container-xl">
              <div className="table-responsive"> */}
          <div className="p-8 bg-white">
            <h2 className="mb-2">
              <b>About to expire Products</b>
            </h2>

            <table className="table border-3">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Expiry Date</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {expiryProduct &&
                  expiryProduct.map((product) => {
                    const { _id, number, name, expiryDate, quantity } = product;
                    return (
                      <tr key={_id}>
                        <td>{number}</td>
                        <td>{name}</td>
                        <td>{expiryDate.slice(0, 10)}</td>
                        <td>{quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* </div>
            </div> */}
          <div className="container-lg pt-5 bg-white">
            <div className="col-sm-14  pb-5 ">
              <h4>
                <b>Most Sold Products</b>
              </h4>
            </div>

            <div className="chart-container">
              <ResponsiveContainer>
                <BarChart data={mostSoldProduct}>
                  {/* <CartesianGrid strokeDasharray="2 2"  /> */}
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    formatter={() => (
                      <span className="text-color-class">Quantity Sold</span>
                    )}
                  />
                  <Bar dataKey="soldQuantity" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
