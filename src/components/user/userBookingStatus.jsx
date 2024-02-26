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

const UserBookingStatus = () => {
  const userId = "65cb48a9222c5e20e0a34fac";
  const [bookings, setBookings] = useState([]);

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
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)",
    },
  };

  const fetchServiceProviderDetails = async (serviceProviderId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/service-providers/getone/${serviceProviderId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching service provider details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/booking/fetchbookinguser/${userId}`
        );
        const bookingsWithDetails = await Promise.all(
          response.data.map(async (booking) => {
            // Fetch service provider details
            const serviceProviderDetails = await fetchServiceProviderDetails(
              booking.serviceProviderId
            );

            return {
              ...booking,
              serviceProviderDetails,
            };
          })
        );
        setBookings(bookingsWithDetails);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [userId]);

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <Card
            className="cardOrders"
            style={styles.cardOrders}
            key={booking._id}
          >
            {booking.serviceProviderDetails && (
              <div>
                <Typography variant="body1" color="text.secondary">
                  ServiceProvider Name: {booking.serviceProviderDetails.spname}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  no: {booking.serviceProviderDetails.spmobile}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  sericename: {booking.serviceProviderDetails.spservicename}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Email: {booking.serviceProviderDetails.spemail}
                </Typography>
              </div>
            )}
            <Typography variant="body1" color="text.secondary">
              Booking ID: {booking._id}, User Status: {booking.userstatus}
            </Typography>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UserBookingStatus;
