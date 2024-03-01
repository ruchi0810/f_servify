import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import carpenter from "../../graphics/carpenter.jpeg";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import varified from "../../graphics/varified.png";
import { Link } from "react-router-dom"; 

import {
  Card,
  Rating,
  CardContent,
  Typography,
  Avatar,
  Container,
} from "@mui/material";

const styles = {
  acceptBtn: {
    backgroundColor: "#2962ff",
    float: "Right",
  },
  acceptedBtn: {
    backgroundColor: "green",
    float: "Right",
  },
  cardOrders: {
    marginTop: "2rem",
    width: 650,
    padding: "2rem",
    alignItems: "center",
    borderRadius: "40px",
    boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)", // Shadow styling
  },
  location: {
    display: "flex",
    alignItems: "center",
  },
  contact: {
    marginTop: "0.6rem",
    display: "flex",
    alignItems: "center",
  },
  gmail: {
    marginTop: "0.6rem",
    display: "flex",
    alignItems: "center",
  },
};

const UserBooking = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const userId = "65cb4890222c5e20e0a34faa";

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
    <div style={{ backgroundColor: "#edf3f5" }}>
      <h1>Service Providers</h1>
      <ul>
        {serviceProviders.map((provider) => (
          <Card
            className="cardOrders"
            style={styles.cardOrders}
            key={provider._id}
          >
            <div style={{ display: "flex" }}>
              <div
                className="avtarcontainer"
                style={{
                  backgroundColor: "#c3e5f7",
                  paddingTop: "1rem",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                  paddingBottom: "1rem",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{ width: 100, height: 100, marginBottom: "1rem" }}
                  src={carpenter}
                />
                <Link to={`/userbooking/${provider._id}`}>
                  <Button
                    style={{
                      backgroundColor: "#002365",
                      color: "white",
                      fontSize: "0.8rem",
                      paddingTop: "0.25rem",
                      paddingBottom: "0.25rem",
                      paddingRight: "0.8rem",
                      paddingLeft: "0.8rem",
                    }}
                  >
                    view profile
                  </Button>
                </Link>
              </div>
              <div style={{ marginLeft: "1.5rem" }}>
                <p
                  style={{
                    marginTop: "0.5rem",
                    backgroundColor: "#002365",
                    borderRadius: "5px",
                    paddingLeft: "0.5rem",
                    paddingRight: "0.5rem",
                    paddingTop: "0.2rem",
                    paddingBottom: "0.2rem",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {`${provider.profession}`}
                </p>
                <div
                  classname="namevarified"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginLeft: "0.5rem",
                      fontSize: "1.2rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {`${provider.fname} ${provider.lname} `}
                  </div>
                  <Avatar
                    sx={{ width: 22, height: 22, marginLeft: "0.5rem" }}
                    src={varified}
                  />
                </div>
                <div>
                  <Rating value={provider.overallRating} readOnly />
                </div>

                <div className="location" style={styles.location}>
                  <IoLocationSharp color="#2962ff" size="1.8rem" />

                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${provider.location} , ${provider.city} `}</div>
                </div>
                <div className="contact" style={styles.contact}>
                  <FaPhoneAlt color="#2962ff" size="1.5rem" />
                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${provider.mobile} `}</div>
                </div>
                <div className="gmail" style={styles.gmail}>
                  <IoMailOpen color="#2962ff" size="1.8rem" />
                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${provider.email} `}</div>
                </div>
              </div>
            </div>
            <div classname="bookbookedbtn">
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
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UserBooking;
