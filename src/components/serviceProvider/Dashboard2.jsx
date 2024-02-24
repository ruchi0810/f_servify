import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BarChartComponent from "./BarChartComponent"; // Import your BarChart component
import PieChartComponent from "./PieChartComponent"; // Import your PieChart component
import orders from "../../graphics/orders.png";
import { Avatar } from "@mui/material";

const Dashboard2 = () => {
  const styles = {
    all_cards: {
      display: "flex",
      zIndex: 1, // Ensure the cards appear above the background
    },
    card1: {
      marginRight: 16,
      width: 300,
      borderRadius: "15px",
    },
    card2: {
      marginRight: 16,
      width: 600,
      borderRadius: "15px",
    },
    all_charts: {
      display: "flex",
      marginTop: "20px",
    },
    pieChartContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "3rem",
    },
    BarChartContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    avtarimg: {
      border: "1px solid blue",
    },
  };

  const Providerdata = {
    orders: 356,
    completedOrders: 250,
    todaysOrders: 30,
    happyCustomers: 200,
  };
  return (
    <div>
      <div className="all_cards" style={styles.all_cards}>
        <Card style={styles.card1}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Bookings
              </Typography>

              <Avatar src={orders} />
            </div>
            <Typography
              variant="body"
              component="div"
              style={{ color: "green" }}
            >
              {Providerdata.orders}
            </Typography>
          </CardContent>
        </Card>
        <Card style={styles.card1}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Complete
              </Typography>
              <Avatar src={orders} />
            </div>
            <Typography
              variant="body"
              component="div"
              style={{ color: "green" }}
            >
              {Providerdata.completedOrders}
            </Typography>
          </CardContent>
        </Card>
        <Card style={styles.card1}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                completed booking
              </Typography>
              <Avatar src={orders} />
            </div>
            <Typography
              variant="body"
              component="div"
              style={{ color: "green" }}
            >
              {Providerdata.todaysOrders}
            </Typography>
          </CardContent>
        </Card>
        <Card style={styles.card1}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                happy customer
              </Typography>
              <Avatar src={orders} />
            </div>
            <Typography
              variant="body"
              component="div"
              style={{ color: "green" }}
            >
              {Providerdata.happyCustomers}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div style={styles.all_charts}>
        <Card style={styles.card2}>
          <CardContent>
            <Typography variant="h6">Orders Per Month (Bar Chart)</Typography>
            <div style={styles.BarChartContainer}>
              <BarChartComponent />
            </div>
          </CardContent>
        </Card>

        <Card style={styles.card2}>
          <CardContent>
            <Typography variant="h6">
              Orders Distribution (Pie Chart)
            </Typography>
            <div style={styles.pieChartContainer}>
              <PieChartComponent />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard2;
