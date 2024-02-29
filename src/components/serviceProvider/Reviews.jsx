import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const { id } = useParams(); // Extract serviceProviderId from the URL
  const serviceProviderId = id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reviews/${serviceProviderId}`
        );

        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchData();
  }, [serviceProviderId]);

  return (
    <div>
      <h1>Reviews Page</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <h3>{review.userId.name}</h3>
            <p>{review.reviews}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
