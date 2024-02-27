import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Card, Typography } from "@mui/material";

const UserBookingStatus = () => {
  const userId = "65cb4890222c5e20e0a34faa";
  const [bookings, setBookings] = useState([]);

  const styles = {
    acceptBtn: {
      backgroundColor: "blue",
    },
    acceptedBtn: {
      backgroundColor: "green",
    },
    cancelBtn: {
      backgroundColor: "red",
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

  const cancelBooking = async (bookingId) => {
    try {
      // Make the API call to cancel the booking
      await axios.put(
        `http://localhost:8000/api/booking/cancelbooking/${bookingId}`
      );

      // Update the local state to mark the booking as canceled
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, userstatus: "canceled" }
            : booking
        )
      );

      console.log(`Booking ID ${bookingId} canceled successfully`);
    } catch (error) {
      console.error("Error canceling booking:", error);
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
              // Add a new property to track cancellation status
              isCanceled: await checkCancellation(booking._id),
            };
          })
        );
        setBookings(bookingsWithDetails);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    // Function to check cancellation status
    const checkCancellation = async (bookingId) => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/booking/checkcancellation/${bookingId}`
        );
        const data = await response.json();
        return !data.canceled; // Invert the value because we want isCanceled to be true if canceled is false
      } catch (error) {
        console.error("Error checking cancellation status:", error);
        return false;
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
            {booking.userstatus !== "canceled" && booking.isCanceled && (
              <Button
                style={styles.cancelBtn}
                variant="contained"
                color="secondary"
                onClick={() => cancelBooking(booking._id)}
                disabled={booking.providerstatus === "cancel booking"} // Disable button if providerstatus is "cancel booking"
              >
                Cancel
              </Button>
            )}
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UserBookingStatus;
