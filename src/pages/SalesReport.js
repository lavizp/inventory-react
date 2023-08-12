import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import StatsService from "../services/StatsService";
import SideNav from "../components/SideNav";

const SalesReport = () => {
  const [data, setData] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  useEffect(() => {
    retrieveSalesAndProfit();
    retrieveWeeklySalesData();
  }, []);

  const retrieveSalesAndProfit = () => {
    StatsService.salesAndProfit()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const retrieveWeeklySalesData = () => {
    StatsService.weeklySalesData()
      .then((res) => {
        const sortedSalesByDay = Object.entries(res.data.salesByDay).sort(
          ([keyA], [keyB]) => {
            const dateA = new Date(keyA.split(", ")[1]);
            const dateB = new Date(keyB.split(", ")[1]);
            return dateA - dateB;
          }
        );
        setWeeklyData(sortedSalesByDay);
      })
      .catch((err) => console.log(err));
  };
  // Prepare data for line chart
  const formattedWeeklyData = weeklyData.map((day) => {
    return {
      name: day.dayOfWeek,
      sales: day.sales,
    };
  });
  console.log(formattedWeeklyData);
  const {
    dailySales,
    dailyProfit,
    weeklySales,
    weeklyProfit,
    monthlySales,
    monthlyProfit,
    quarterlySales,
    quarterlyProfit,
    yearlySales,
    yearlyProfit,
    totalSales,
    totalProfit,
  } = data;

  // Prepare data for pie charts
  const pieChartData = [
    { name: "Sales", value: dailySales },
    { name: "Profit", value: dailyProfit },
  ];

  const pieChartDataWeekly = [
    { name: "Sales", value: weeklySales },
    { name: "Profit", value: weeklyProfit },
  ];

  const pieChartDataMonthly = [
    { name: "Sales", value: monthlySales },
    { name: "Profit", value: monthlyProfit },
  ];

  const pieChartDataQuarterly = [
    { name: "Sales", value: quarterlySales },
    { name: "Profit", value: quarterlyProfit },
  ];

  const pieChartDataYearly = [
    { name: "Sales", value: yearlySales },
    { name: "Profit", value: yearlyProfit },
  ];

  const pieChartDataTotal = [
    { name: "Sales", value: totalSales },
    { name: "Profit", value: totalProfit },
  ];

  // Colors for pie charts
  const colors = ["#8884d8", "#82ca9d"];
  // Prepare data for line chart
  const lineChartData = weeklyData.map(([date, sales]) => ({ date, sales }));
  console.log("data", pieChartDataQuarterly);
  return (
    <>
      <div className="flex gap-10 bg-slate-200">
        <SideNav />
        <div className="flex flex-col gap-10">
          <div className="container">
            <div className="row">
              <div className="col-md-11 bg-white">
                <h3>Weekly Sales</h3>
                <div className="chart-container p-2">
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(date) =>
                          new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })
                        }
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="container bg-white">
            <h2 className="mt-4 mb-3">Sales and Profit Report</h2>

            <div className="row">
              <div className="col-md-6">
                <div className="chart-container p-5">
                  <h3>Daily Sales and Profit</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-6">
                <div className="chart-container p-5">
                  <h3>Weekly Sales and Profit</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartDataWeekly}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {pieChartDataWeekly.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="chart-container p-5">
                  <h3>Monthly Sales and Profit</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartDataMonthly}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {pieChartDataMonthly.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-md-6">
                <div className="chart-container p-5">
                  <h3>Quarterly Sales and Profit</h3>

                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartDataQuarterly}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {pieChartDataQuarterly.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="chart-container p-5">
                  <h3>Yearly Sales and Profit</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartDataYearly}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {pieChartDataYearly.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-6">
                <div className="chart-container p-5">
                  <h3>Total Sales and Profit</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartDataTotal}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {pieChartDataTotal.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
