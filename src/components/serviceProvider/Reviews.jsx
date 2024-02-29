import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Card, Typography, Rating } from "@mui/material";
import carpenter from "../../graphics/carpenter.jpeg";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState({});

  const { id } = useParams(); // Extract serviceProviderId from the URL
  const serviceProviderId = id;

  const styles = {
    reviewsContainer: {
      paddingLeft: "5rem",
      paddingRight: "5rem",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between", // Adjust as needed
    },
    reviewcard: {
      width: "45%", // Adjust width as needed
      borderRadius: "20px",
      padding: "1rem",
      marginTop: "1rem",
      marginBottom: "1rem", // Add margin between cards
      boxSizing: "border-box", // Include padding and border in the width
    },
    avatar: {
      width: 100,
      height: 100,
      margin: "1rem auto",
      backgroundColor: "#ff9800",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reviews/${serviceProviderId}`
        );

        setReviews(response.data);
        for (const review of response.data) {
          const userId = review.userId._id;
          const rating = await fetchSpecificRating(userId);
          setRatings((prevRatings) => ({
            ...prevRatings,
            [userId]: rating,
          }));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchData();
  }, [serviceProviderId]);

  const fetchSpecificRating = async (userId) => {
    try {
      const ratingResponse = await axios.get(
        `http://localhost:8000/api/ratings/getspecificrating/${userId}/${serviceProviderId}`
      );

      const fetchedRating = ratingResponse.data.rating;
      console.log(
        `User ID: ${userId}, Rating: ${fetchedRating} , typeof: ${typeof fetchedRating}`
      );

      return fetchedRating;
    } catch (error) {
      console.error("Error fetching specific rating:", error.message);
      return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#edf3f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>Reviews Page</h1>
      <div style={styles.reviewsContainer}>
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
              <div>
                <Avatar src={carpenter} />
              </div>
              <div style={{ marginLeft: "0.5rem" }}>
                <Typography variant="h8" style={{ fontWeight: "bold" }}>
                  {review.userId.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {formatDistanceToNow(new Date(review.createdAt), {
                    addSuffix: true,
                  })}
                </Typography>
              </div>
            </div>
            <Rating value={ratings[review.userId._id] || 0} readOnly />
            <br></br>
            <Typography variant="h8">{review.reviews}</Typography>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
