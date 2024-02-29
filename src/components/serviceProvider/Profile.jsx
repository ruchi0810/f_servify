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
  const [serviceProviderDetails, setServiceProviderDetails] = useState("");
  const [reviews, setReviews] = useState([]);
  const serviceProviderId = "65df1f976d4c10c017ae01ee";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace the URL with your actual backend API endpoint
        const response = await axios.post(
          "http://localhost:8000/api/service-providers/getServiceProviderDetailsById",
          {
            _id: serviceProviderId, // Pass the email in the request body
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
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/reviews/last3reviews",
          {
            serviceProviderId: serviceProviderId,
          }
        );

        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();
  }, [serviceProviderId]);

  const styles = {
    card: {
      width: 360, // Corrected property name
      margin: "auto",
      borderRadius: "20px",
    },
    reviewcard: {
      width: 360, // Corrected property name
      borderRadius: "20px",
      padding: "1rem",
      marginTop: "1rem",
    },
    top3reviews: {
      padding: "1.5rem",
      borderRadius: "14px",
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
    readmorebtn: {
      backgroundColor: "#2962ff",
      marginTop: "1rem",
      marginLeft: "16rem",
    },
    serviceCard: {
      marginRight: 16,
      width: 320,
      borderRadius: "22px",
    },
    enterprisecard: {
      display: "flex",
      marginRight: 16,
      width: 780,
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.content}
                >
                  {serviceProviderDetails.gender}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={styles.content}
                >
                  {serviceProviderDetails.age}
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
                    Experties
                  </Typography>
                </div>
                <Typography variant="h8" component="div">
                  enterprice
                </Typography>
              </CardContent>
            </Card>
            <Card classname="top3reviews" style={styles.top3reviews}>
              <Typography
                variant="h5"
                component="div"
                style={{ fontWeight: "bold" }}
              >
                Top Reviews
              </Typography>
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  className="reviewcard"
                  style={styles.reviewcard}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "0.2rem",
                      alignItems: "center",
                    }}
                  >
                    {/* You might need to replace this with the actual avatar source */}
                    <Avatar src={carpenter} />
                    <Typography variant="h8" style={{ fontWeight: "bold" }}>
                      {review.userId.name}
                    </Typography>
                  </div>
                  <Typography variant="h8">{review.reviews}</Typography>
                </Card>
              ))}
              <Link to={`reviews/${serviceProviderDetails._id}`}>
                <Button
                  style={styles.readmorebtn}
                  variant="contained"
                  color="primary"
                >
                  View All...
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
