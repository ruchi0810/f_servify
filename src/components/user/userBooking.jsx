import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
} from "@mui/material";

const styles = {
  acceptBtn: {
    backgroundColor: "blue",
  },
  acceptedBtn: {
    backgroundColor: "green",
  },
  cardOrders: {
    marginTop: "2rem",
    width: 900,
    padding: "2rem",
    alignItems: "center",
    borderRadius: "40px",
    boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)", // Shadow styling
  },
};

const UserBooking = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const userId = "65cb48a9222c5e20e0a34fac";

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/service-providers/getall"
      );

      console.log("API Response:", response.data);

      // Fetch booking status for each service provider
      const providersWithStatus = await Promise.all(
        response.data.map(async (provider) => {
          const bookingStatusResponse = await axios.post(
            "http://localhost:8000/api/booking/checkbookingstatus",
            {
              userId,
              serviceProviderId: provider._id,
            }
          );
          return {
            ...provider,
            bookingStatus: bookingStatusResponse.data,
          };
        })
      );

      setServiceProviders(providersWithStatus);
    } catch (error) {
      console.error("Error fetching service providers:", error);
    }
  };

  useEffect(() => {
    fetchServiceProviders();
  }, [userId]);

  const handleBookClick = async (providerId) => {
    try {
      // Make the API call to create a booking
      await axios.post("http://localhost:8000/api/booking/createbooking", {
        userId,
        serviceProviderId: providerId,
      });

      setServiceProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider._id === providerId
            ? { ...provider, bookingStatus: "booked" }
            : provider
        )
      );

      console.log(`Booking successful for provider ID: ${providerId}`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <h1>Service Providers</h1>
      <ul>
        {serviceProviders.map((provider) => (
          <Card
            className="cardOrders"
            style={styles.cardOrders}
            key={provider._id}
          >
            <Typography variant="body1" color="text.secondary">
              {`ID: ${provider._id}`}
            </Typography>

            {provider.bookingStatus === "notbooked" && (
              <Button
                style={styles.acceptBtn}
                className="acceptbtn"
                variant="contained"
                color="primary"
                onClick={() => handleBookClick(provider._id)}
              >
                Book
              </Button>
            )}
            {provider.bookingStatus === "booked" && (
              <Button
                style={styles.acceptedBtn}
                className="acceptedBtn"
                variant="contained"
                color="primary"
                disabled
              >
                Booked
              </Button>
            )}
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UserBooking;
