import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import carpenter from "../../graphics/carpenter.jpeg";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { FaPerson } from "react-icons/fa6";
import varified from "../../graphics/varified.png";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useParams } from "react-router-dom";
import { Card, Typography, Avatar, Rating, CardContent } from "@mui/material";
import orders from "../../graphics/orders.png";

const ProviderProfilePage = () => {
  const { id } = useParams();
  const [providerData, setProviderData] = useState(null);

  useEffect(() => {
    // Define a function to fetch provider data by ID
    const fetchProviderData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/service-providers/getone/${id}`
        );
        setProviderData(response.data);
      } catch (error) {
        console.error("Error fetching provider data:", error);
      }
    };

    // Call the function
    fetchProviderData();
  }, [id]);
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
      padding: "2rem",
      alignItems: "center",
      borderRadius: "40px",
      width: "60%",
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)", // Shadow styling
    },
    skills: {
      marginTop: "2rem",
      padding: "2rem",
      alignItems: "center",
      borderRadius: "40px",
      marginLeft: "1.5rem",
      width: "30%",
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
    card1: {
      borderRadius: "15px",
      marginTop: "1rem",
    },
  };

  const bookingTypes = [
    { label: "completed Bookings", bookings: 10 },
    { label: "total Bookings", bookings: 100 },
    // Add more booking types as needed
  ];

  return (
    <div style={{ backgroundColor: "#edf3f5", minHeight: "100vh" }}>
      <h1>Profile Page</h1>
      <div
        className="infocontainer"
        style={{
          paddingRight: "3rem",
          paddingLeft: "3rem",
          display: "flex",
        }}
      >
        {providerData && (
          <Card className="cardOrders" style={styles.cardOrders}>
            <div style={{ display: "flex" }}>
              <div
                className="avtarcontainer"
                style={{
                  width: "15%",
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
                <Avatar sx={{ width: 150, height: 150 }} src={carpenter} />
              </div>
              <div
                className="informationpart1"
                style={{ marginLeft: "1.5rem", width: "30%" }}
              >
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
                  {`${providerData.profession}`}
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
                    {`${providerData.fname} ${providerData.lname} `}
                  </div>
                  <Avatar
                    sx={{ width: 22, height: 22, marginLeft: "0.5rem" }}
                    src={varified}
                  />
                </div>
                <div>
                  <Rating value={providerData.overallRating} readOnly />
                </div>

                <div className="location" style={styles.location}>
                  <IoLocationSharp color="#2962ff" size="1.8rem" />

                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${providerData.location} , ${providerData.city} `}</div>
                </div>
                <div className="contact" style={styles.contact}>
                  <FaPhoneAlt color="#2962ff" size="1.5rem" />
                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${providerData.mobile} `}</div>
                </div>
                <div className="gmail" style={styles.gmail}>
                  <IoMailOpen color="#2962ff" size="1.8rem" />
                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${providerData.email} `}</div>
                </div>
              </div>
              <div
                className="informationpart2"
                style={{ marginLeft: "1.5rem", width: "20%" }}
              >
                <div className="gender" style={styles.gmail}>
                  <FaPerson color="#2962ff" size="1.8rem" />
                  <div
                    style={{ marginLeft: "0.5rem" }}
                  >{`  ${providerData.gender} `}</div>
                </div>
              </div>
            </div>
          </Card>
        )}
        {providerData && (
          <Card className="bookings" style={styles.skills}>
            {bookingTypes.map((bookingType, index) => (
              <Card style={styles.card1} key={index}>
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
                      {bookingType.label}
                    </Typography>
                    <Avatar src={orders} />
                  </div>
                  <Typography
                    variant="body"
                    component="div"
                    style={{ color: "green" }}
                  >
                    {bookingType.bookings}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Card>
        )}
      </div>
      {/* <div>
        <Card>reviews</Card>
      </div> */}
    </div>
  );
};

export default ProviderProfilePage;
