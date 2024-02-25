import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const UserBooking = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const userId = "65d08de12040b91e2763c586";

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/service-providers/getall"
        );
        setServiceProviders(response.data);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      }
    };

    fetchServiceProviders();
  }, []);

  const handleBook = async (serviceProviderId) => {
    try {
      await axios.post("http://localhost:8000/api/booking/createbooking", {
        userId: userId,
        serviceProviderId: serviceProviderId,
      });

      setServiceProviders((prevServiceProviders) =>
        prevServiceProviders.map((provider) =>
          provider._id === serviceProviderId
            ? { ...provider, booked: true }
            : provider
        )
      );
    } catch (error) {
      console.error("Error booking service provider:", error);
    }
  };

  return (
    <div>
      <h2>Service Providers</h2>
      {serviceProviders.map((provider) => (
        <div key={provider._id}>
          <p>Service Provider ID: {provider._id}</p>
          {provider.booked ? (
            <Button
              style={{ backgroundColor: "#4CAF50", color: "#FFF" }}
              variant="contained"
              disabled
            >
              booked
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "#1976D2", color: "#FFF" }}
              variant="contained"
              onClick={() => handleBook(provider._id)}
            >
              Book
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserBooking;
