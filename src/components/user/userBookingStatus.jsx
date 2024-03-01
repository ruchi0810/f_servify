import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Card, Typography, Avatar } from "@mui/material";
import carpenter from "../../graphics/carpenter.jpeg";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import cancelled from "../../graphics/cancel.png";
import pending from "../../graphics/pending.png";
import completed from "../../graphics/completed.png";
import confirm from "../../graphics/confirm.png";

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
      float: "Right",
    },
    cardOrders: {
      marginTop: "2rem",
      width: 750,
      paddingLeft: "2rem",
      paddingRight: "2rem",
      paddingTop: "1.5rem",
      paddingBottom: "1rem",
      alignItems: "center",
      borderRadius: "40px",
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)",
    },
    location: {
      display: "flex",
      alignItems: "center",
    },
    contact: {
      display: "flex",
      alignItems: "center",
    },
    gmail: {
      display: "flex",
      alignItems: "center",
    },
    statusimg: {
      borderRadius: "50%",
      maxWidth: "50px",
      maxHeight: "50px",
      objectFit: "cover",
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
    <div style={{ backgroundColor: "#edf3f5" }}>
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
                <div
                  classname="name-profileimg"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar sx={{ width: 50, height: 50 }} src={carpenter} />
                  <div
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginLeft: "0.5rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    {booking.serviceProviderDetails.fname}{" "}
                    {booking.serviceProviderDetails.lname}
                  </div>
                </div>
                <div
                  classname="contactdetail"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="location" style={styles.location}>
                    <IoLocationSharp color="#2962ff" size="1.8rem" />

                    <div
                      style={{ marginLeft: "0.5rem" }}
                    >{`  ${booking.serviceProviderDetails.location} , ${booking.serviceProviderDetails.city} `}</div>
                  </div>
                  <div className="contact" style={styles.contact}>
                    <FaPhoneAlt color="#2962ff" size="1.5rem" />
                    <div
                      style={{ marginLeft: "0.5rem" }}
                    >{`  ${booking.serviceProviderDetails.mobile} `}</div>
                  </div>
                  <div className="gmail" style={styles.gmail}>
                    <IoMailOpen color="#2962ff" size="1.8rem" />
                    <div
                      style={{ marginLeft: "0.5rem" }}
                    >{`  ${booking.serviceProviderDetails.email} `}</div>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* {booking.userstatus === "confirm" && <Avatar src={confirm} />}
              {booking.userstatus === "completed" && (
                <img src={completed} alt="Completed" style={styles.statusimg} />
              )}
              {booking.userstatus === "pending" && (
                <img src={pending} alt="Pending" style={styles.statusimg} />
              )}
              {booking.userstatus === "cancel" && (
                <img src={cancelled} alt="Cancelled" style={styles.statusimg} />
              )} */}
              <div variant="body1">User Status: {booking.userstatus}</div>
            </div>
            {booking.userstatus !== "canceled" && booking.isCanceled && (
              <Button
                style={styles.cancelBtn}
                variant="contained"
                color="secondary"
                onClick={() => cancelBooking(booking._id)}
                disabled={booking.providerstatus === "cancel booking"}
              >
                Cancel
              </Button>
            )}
            <div
              classname="bookingdetail"
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "gray",
                marginTop: "3rem",
              }}
            >
              <div variant="h5">Booking ID: {booking._id}</div>
              <div variant="h5">
                {formatDistanceToNow(new Date(booking.createdAt), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UserBookingStatus;
