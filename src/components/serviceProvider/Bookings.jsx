import React, { useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
} from "@mui/material";
import { pink, blue, green } from "@mui/material/colors";
import user_profile from "../../graphics/user_profile.jpg";
import axios from "axios";

const checkBookingAccepted = (booking) =>
  booking.providerstatus === "accepted" && booking.userstatus === "confirm";

const isBookingDeclined = (booking) =>
  booking.providerstatus === "cancel booking" &&
  booking.userstatus === "cancel from sp";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const serviceProviderId = "65deb84452aabe28c38143fe";

  useEffect(() => {
    // Fetch bookings from your API when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/booking/fetchbooking/${serviceProviderId}`
        );
        const bookingsWithUserDetails = await Promise.all(
          response.data.map(async (booking) => {
            const userResponse = await axios.get(
              `http://localhost:8000/api/users/getone/${booking.userId}`
            );

            return { ...booking, userDetails: userResponse.data };
          })
        );

        setBookings(bookingsWithUserDetails);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []); // Empty dependency array to run the effect only once

  const handleAccept = async (bookingId) => {
    try {
      // Make API call to accept booking
      await axios.put(
        `http://localhost:8000/api/booking/acceptbooking/${bookingId}`
      );
      // Update local state to reflect the change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, userstatus: "confirm", providerstatus: "accepted" }
            : booking
        )
      );
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  const handleDecline = async (bookingId) => {
    try {
      // Make API call to decline booking
      await axios.put(
        `http://localhost:8000/api/booking/declinebooking/${bookingId}`
      );

      // Update local state to reflect the change
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                userstatus: "cancel from sp",
                providerstatus: "cancel booking",
              }
            : booking
        )
      );
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  const styles = {
    cardOrders: {
      marginTop: "2rem",
      width: 900,
      alignItems: "center",
      borderRadius: "40px",
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)", // Shadow styling
    },
    declineBtn: {
      backgroundColor: "#bc000b",
    },
    acceptBtn: {
      backgroundColor: blue[500],
    },
    acceptedBtn: {
      backgroundColor: green[500],
    },
    cancelledCard: {
      filter: "blur(2px)",
      opacity: 0.7,
      border: "2px solid red",
    },
  };

  const renderBookingCard = (booking) => {
    const isBookingCancelled =
      booking.providerstatus === "cancel from user" &&
      booking.userstatus === "cancel";
    const isAccepted = checkBookingAccepted(booking);

    return (
      !isBookingDeclined(booking) && (
        <Card
          className={`cardOrders ${isBookingCancelled ? "cancelled" : ""}`}
          style={{
            ...styles.cardOrders,
            ...(isBookingCancelled ? styles.cancelledCard : {}),
          }}
          key={booking._id}
        >
          <div style={{ marginLeft: "2rem", padding: "0.8rem" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{ bgcolor: pink[500] }}
                  alt={booking.userDetails.name}
                  src={user_profile}
                />
                <Typography
                  variant="h6"
                  component="div"
                  style={{ marginLeft: "0.5rem", fontWeight: "bold" }}
                >
                  {booking.userDetails.name}
                </Typography>
              </div>
              <Typography variant="body1" color="text.secondary">
                Mobile: {booking.userDetails.mobile}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                City: {booking.userDetails.city}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Address: {booking.userDetails.address}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Email: {booking.userDetails.email}
              </Typography>
            </CardContent>
            <CardActions>
              {!isAccepted && (
                <>
                  <Button
                    style={styles.acceptBtn}
                    className="acceptbtn"
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept(booking._id)}
                    disabled={isBookingCancelled}
                  >
                    Accept
                  </Button>
                  <Button
                    style={styles.declineBtn}
                    className="declinebtn"
                    variant="contained"
                    onClick={() => handleDecline(booking._id)}
                    disabled={isBookingCancelled}
                  >
                    Decline
                  </Button>
                </>
              )}
              {isAccepted && (
                <Button
                  style={styles.acceptedBtn}
                  className="acceptedBtn"
                  variant="contained"
                  color="primary"
                  disabled
                >
                  Accepted
                </Button>
              )}
            </CardActions>
          </div>
        </Card>
      )
    );
  };

  return (
    <Container>
      <h2>Bookings</h2>
      {bookings
        .slice()
        .reverse()
        .map((booking) => renderBookingCard(booking))}
    </Container>
  );
};

export default Bookings;
