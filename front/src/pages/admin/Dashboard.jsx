import { Card, CardContent, CardHeader, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import apiRequest from "../../utils/apiRequest";

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [salesData, setSalesData] = useState([]);
  const [averageCartData, setAverageCartData] = useState([]);
  const [categorySalesData, setCategorySalesData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const { data: sales, error: salesError } = await apiRequest(
          "/statistics/sales-per-day"
        );
        if (!salesError) setSalesData(sales);

        const { data: averageCart, error: averageCartError } = await apiRequest(
          "/statistics/average-cart"
        );
        if (!averageCartError) setAverageCartData(averageCart);

        const { data: categorySales, error: categorySalesError } =
          await apiRequest("/statistics/category-sales");
        if (!categorySalesError) setCategorySalesData(categorySales);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, [dataProvider]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Card>
      <CardHeader title="📊 Dashboard E-commerce" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">📅 Sales per day</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${value}€`}
                />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">🛒 Average cart</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={averageCartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `${value}€`}
                />
                <Legend />
                <Bar dataKey="cartMin" name="Cart Min" fill="#FF8042" />
                <Bar dataKey="cartAverage" name="Cart Average" fill="#00C49F" />
                <Bar dataKey="cartMax" name="Cart Max" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">📦 Sales by category</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ category }) => category}
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      return (
                        <div
                          style={{
                            backgroundColor: "#fff",
                            padding: "5px",
                            border: "1px solid #ccc",
                          }}
                        >
                          <p>{payload[0].value}€</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
