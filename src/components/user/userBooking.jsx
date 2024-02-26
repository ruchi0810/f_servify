// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Button from "@mui/material/Button";

// const styles = {
//   acceptBtn: {
//     backgroundColor: "blue",
//   },
//   acceptedBtn: {
//     backgroundColor: "green",
//   },
// };

// const UserBooking = () => {
//   const [serviceProviders, setServiceProviders] = useState([]);
//   const userId = "65cb48a9222c5e20e0a34fac";

//   useEffect(() => {
//     const fetchServiceProviders = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/service-providers/getall"
//         );

//         console.log("API Response:", response.data);

//         // Fetch booking status for each service provider
//         const providersWithStatus = await Promise.all(
//           response.data.map(async (provider) => {
//             const bookingStatusResponse = await axios.post(
//               "http://localhost:8000/api/booking/checkbookingstatus",
//               {
//                 userId,
//                 serviceProviderId: provider._id,
//               }
//             );
//             return {
//               ...provider,
//               bookingStatus: bookingStatusResponse.data,
//             };
//           })
//         );

//         setServiceProviders(providersWithStatus);
//       } catch (error) {
//         console.error("Error fetching service providers:", error);
//       }
//     };

//     fetchServiceProviders();
//   }, [userId]);

//   const handleBookClick = async (providerId) => {
//     try {
//       // Make the API call to create a booking
//       await axios.post("http://localhost:8000/api/booking/createbooking", {
//         userId,
//         serviceProviderId: providerId,
//       });

//       // Update the local state or perform any other actions if needed
//       console.log(`Booking successful for provider ID: ${providerId}`);
//     } catch (error) {
//       console.error("Error creating booking:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Service Providers</h1>
//       <ul>
//         {serviceProviders.map((provider) => (
//           <li key={provider._id}>
//             {`ID: ${provider._id}`}
//             {provider.bookingStatus === "notbooked" && (
//               <Button
//                 style={styles.acceptBtn}
//                 className="acceptbtn"
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleBookClick(provider._id)}
//               >
//                 Book
//               </Button>
//             )}
//             {provider.bookingStatus === "booked" && (
//               <Button
//                 style={styles.acceptedBtn}
//                 className="acceptedBtn"
//                 variant="contained"
//                 color="primary"
//                 disabled
//               >
//                 Booked
//               </Button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserBooking;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const styles = {
  acceptBtn: {
    backgroundColor: "blue",
  },
  acceptedBtn: {
    backgroundColor: "green",
  },
};

const UserBooking = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const userId = "65cb48a9222c5e20e0a34fac";

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

      // Update the local state to mark the provider as booked
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
    <div>
      <h1>Service Providers</h1>
      <ul>
        {serviceProviders.map((provider) => (
          <li key={provider._id}>
            {`ID: ${provider._id}`}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBooking;
