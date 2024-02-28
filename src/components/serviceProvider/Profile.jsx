import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"; // Import Link from React Router
import carpenter from "../../graphics/carpenter.jpeg";
import sp2 from "../../graphics/sp2.png";

const Profile = () => {
  const [serviceProviderDetails, setServiceProviderDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with your actual backend API endpoint
        const response = await axios.post(
          "http://localhost:8000/api/service-providers/getServiceProviderDetailsByEmail",
          {
            email: "jaydeep@gmail.com", // Pass the email in the request body
          }
        );

        // Set the fetched data to the state
        setServiceProviderDetails(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  const styles = {
    card: {
      width: 360, // Corrected property name
      margin: "auto",
      borderRadius: "20px",
    },
    avatar: {
      width: 100,
      height: 100,
      margin: "1rem auto",
      backgroundColor: "#ff9800", // Customize the background color
    },
    content: {
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
      backgroundColor: "#e4f5fc",
      borderRadius: "20px",
      width: "100%",
      height: "35px",
      display: "flex", // Add display: flex
      flexDirection: "column",
      alignItems: "center", // Add alignItems: center
      justifyContent: "center", // Add justifyContent: center
    },
    updatebtn: {
      backgroundColor: "#2962ff",
      marginLeft: "13.5rem",
      marginTop: "2rem",
    },
    serviceCard: {
      marginRight: 16,
      width: 320,
      borderRadius: "22px",
    },
    enterprisecard: {
      display: "flex",
      marginRight: 16,
      width: 650,
      height: 200,
      backgroundColor: "#ffc37c",
      borderRadius: "40px",
    },
    enterprisecardclass: {
      //border: "2px solid red",
    },
    servicecardclass: {
      display: "flex",
      marginTop: "2rem",
    },
    about: {
      marginLeft: "40px",
    },
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="info">
          {serviceProviderDetails && (
            <Card style={styles.card}>
              <CardContent>
                <Avatar style={styles.avatar}>
                  {serviceProviderDetails.fname[0]}
                </Avatar>
                <Typography variant="h5" component="div" style={styles.content}>
                  {serviceProviderDetails.fname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.content}
                >
                  {serviceProviderDetails.mobile}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.content}
                >
                  {serviceProviderDetails.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.content}
                >
                  {serviceProviderDetails.city}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.content}
                >
                  {serviceProviderDetails.location}
                </Typography>
                <Link to={`edit/${serviceProviderDetails._id}`}>
                  <Button
                    style={styles.updatebtn}
                    className="acceptedBtn"
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="about" style={styles.about}>
          <div
            className="enterprisecardclass"
            style={styles.enterprisecardclass}
          >
            <Card style={styles.enterprisecard}>
              <CardContent>
                <div style={{ padding: "2rem" }}>
                  <Typography
                    style={{ color: "black", fontWeight: "bold" }}
                    variant="h5"
                    component="div"
                  >
                    SP Enterprise
                  </Typography>
                  <Typography
                    style={{ color: "black", fontWeight: "bold" }}
                    variant="h5"
                    component="div"
                  >
                    ruchi
                  </Typography>
                  <Typography
                    style={{ color: "black" }}
                    variant="h8"
                    component="div"
                  >
                    Good Morning
                  </Typography>
                </div>
              </CardContent>
              <img src={sp2} />
            </Card>
          </div>
          <div className="servicecardclass" style={styles.servicecardclass}>
            <Card style={styles.serviceCard}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <Avatar src={carpenter} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    Skills
                  </Typography>
                </div>
                <Typography variant="h8" component="div">
                  carpenter
                </Typography>
              </CardContent>
            </Card>
            <Card style={styles.serviceCard}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <Avatar src={carpenter} />
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    Experties
                  </Typography>
                </div>
                <Typography variant="h8" component="div">
                  enterprice
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
