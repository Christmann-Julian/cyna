import { Card, CardContent, CardHeader, Typography, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDataProvider } from 'react-admin';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, 
  PieChart, Pie, Cell 
} from 'recharts';

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [salesData, setSalesData] = useState([]);
  const [averageBasketData, setAverageBasketData] = useState([]);
  const [categorySalesData, setCategorySalesData] = useState([]);

  useEffect(() => {
    // Simuler des données factices
    setSalesData([
      { date: '01/02', ventes: 150 },
      { date: '02/02', ventes: 200 },
      { date: '03/02', ventes: 170 },
      { date: '04/02', ventes: 250 },
      { date: '05/02', ventes: 300 }
    ]);

    setAverageBasketData([
      { date: '01/02', panierMin: 20, panierMoyen: 50, panierMax: 100 },
      { date: '02/02', panierMin: 25, panierMoyen: 55, panierMax: 110 },
      { date: '03/02', panierMin: 22, panierMoyen: 53, panierMax: 105 },
      { date: '04/02', panierMin: 30, panierMoyen: 60, panierMax: 120 },
      { date: '05/02', panierMin: 35, panierMoyen: 65, panierMax: 130 }
    ]);

    setCategorySalesData([
      { name: 'Prévention', value: 400 },
      { name: 'Protection', value: 300 },
      { name: 'Réponse', value: 500 }
    ]);
  }, [dataProvider]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Card>
      <CardHeader title="📊 Dashboard E-commerce" />
      <CardContent>
        <Grid container spacing={3}>
          {/* Histogramme des ventes par jour */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">📅 Ventes par jour</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventes" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Histogramme multi-couches des paniers moyens */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">🛒 Paniers moyens</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={averageBasketData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="panierMin" fill="#FF8042" />
                <Bar dataKey="panierMoyen" fill="#00C49F" />
                <Bar dataKey="panierMax" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          {/* Piechart des ventes par catégorie */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">📦 Répartition des ventes</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
