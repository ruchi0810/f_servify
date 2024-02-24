// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   LinearProgress,
//   CircularProgress,
// } from "@mui/material";
// // import { blue } from "@mui/material/colors";
// import carpenter from "../../graphics/carpenter.jpeg";

// const Dashboard = () => {
//   const styles = {
//     namingCard: {
//       marginRight: 16,
//       width: 500,
//       height: 200,
//       backgroundColor: "#ffc37c",
//       borderRadius: "40px",
//     },
//     serviceCard: {
//       marginRight: 16,
//       width: 300,
//     },

//     namingsection: {
//       display: "flex",
//       marginBottom: "2rem",
//     },
//     servicessection: {
//       display: "flex",
//       // paddingTop: "5rem",
//       // marginTop: "5rem",
//     },
//     orderText: {
//       fontSize: "0.8rem",
//       color: "gray",
//       textAlign: "center",
//     },
//     progressBar: {
//       marginTop: "2rem",
//     },
//     ratingCircle: {
//       marginTop: "1rem",
//       marginBottom: "1rem",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     ratingText: {
//       fontSize: "1.5rem",
//       fontWeight: "bold",
//     },
//   };
//   const calculateProgress = (completedOrders, totalOrders) => {
//     return (completedOrders / totalOrders) * 100;
//   };

//   return (
//     <div>
//       <div className="namingsection" style={styles.namingsection}>
//         {/* Card 1 */}
//         <Card style={styles.namingCard}>
//           <CardContent>
//             <div style={{ padding: "0.8rem" }}>
//               <Typography
//                 style={{ color: "black", fontWeight: "bold" }}
//                 variant="h5"
//                 component="div"
//               >
//                 Good Morning Ruchi!
//               </Typography>
//               <Typography
//                 style={{ color: "black" }}
//                 variant="h8"
//                 component="div"
//               >
//                 Good Morning
//               </Typography>
//             </div>
//           </CardContent>
//         </Card>
//         <div style={styles.ratingCircle}>
//           <CircularProgress
//             variant="determinate"
//             value={(4.5 / 5) * 100} // Example: 4.5 out of 5 rating
//             size={100}
//             thickness={5}
//             color="secondary"
//             sx={{
//               "& .MuiCircularProgress-circle": {
//                 strokeLinecap: "round", // Use rounded line caps
//               },
//             }}
//           />
//           <Typography style={styles.ratingText}>4.5</Typography>
//         </div>
//       </div>
//       <div>
//         <h2 style={{ paddingTop: "0.5rem", paddingBottom: "1rem" }}>
//           Popular Services
//         </h2>
//       </div>

//       <div className="servicessection" style={styles.namingsection}>
//         {/* Card 1 */}
//         <Card style={styles.serviceCard}>
//           <CardContent>
//             <div style={{ display: "flex" }}>
//               <Avatar alt="Carpenter" src={carpenter} />
//               <Typography
//                 variant="h5"
//                 component="div"
//                 style={{ fontWeight: "bold" }}
//               >
//                 Carpenter
//               </Typography>
//             </div>
//             <Typography variant="h8" component="div">
//               Carpenter
//             </Typography>
//             <LinearProgress
//               variant="determinate"
//               value={calculateProgress(78, 100)}
//               color="primary"
//               style={styles.progressBar}
//             />
//           </CardContent>
//         </Card>

//         {/* Card 2 */}
//         <Card style={styles.serviceCard}>
//           <CardContent>
//             <div style={{ display: "flex" }}>
//               <Avatar alt="Cook" src={carpenter} />
//               <Typography variant="h5" component="div">
//                 Cook
//               </Typography>
//             </div>
//             <Typography variant="h8" component="div">
//               Carpenter
//             </Typography>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  CircularProgress,
  Grid,
} from "@mui/material";
import carpenter from "../../graphics/carpenter.jpeg";
import sp2 from "../../graphics/sp2.png";

const Dashboard = () => {
  const styles = {
    namingCard: {
      display: "flex",
      marginRight: 16,
      width: 600,
      height: 200,
      backgroundColor: "#ffc37c",
      borderRadius: "40px",
    },
    serviceCard: {
      marginRight: 16,
      width: 300,
      borderRadius: "22px",
    },
    namingsection: {
      display: "flex",
      marginBottom: "2rem",
    },
    servicessection: {
      display: "flex",
    },
    orderText: {
      fontSize: "0.8rem",
      color: "gray",
      textAlign: "center",
    },
    progressBar: {
      marginTop: "2rem",
    },
    ratingCircle: {
      marginTop: "1rem",
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ratingText: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
  };

  const services = [
    {
      name: "Carpenter",
      image: carpenter,
      progress: calculateProgress(78, 100),
    },
    {
      name: "Cook",
      image: carpenter,
      progress: calculateProgress(25, 100),
    },
    {
      name: "Cook",
      image: carpenter,
      progress: calculateProgress(55, 100),
    },

    // Add more services as needed
  ];

  const serviceDetails = [
    { name: "Ruchi", overallRating: 4.5 },
    // Add more services as needed
  ];

  function calculateProgress(completedOrders, totalOrders) {
    return (completedOrders / totalOrders) * 100;
  }

  return (
    <div>
      <div className="namingsection" style={styles.namingsection}>
        <Card style={styles.namingCard}>
          <CardContent>
            <div style={{ padding: "2rem" }}>
              <Typography
                style={{ color: "black", fontWeight: "bold" }}
                variant="h5"
                component="div"
              >
                Good Morning
              </Typography>
              <Typography
                style={{ color: "black", fontWeight: "bold" }}
                variant="h5"
                component="div"
              >
                {serviceDetails[0].name}!
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

        {/* <div style={styles.ratingCircle}>
          <CircularProgress
            variant="determinate"
            value={(serviceDetails[0].overallRating / 5) * 100} // Example: 4.5 out of 5 rating
            size={100}
            thickness={5}
            color="secondary"
            sx={{
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round", // Use rounded line caps
              },
            }}
          />
        </div> */}
      </div>
      <div>
        <h2 style={{ paddingTop: "0.5rem", paddingBottom: "1rem" }}>
          Popular Services
        </h2>
      </div>

      <div className="servicessection" style={styles.servicessection}>
        {services.map((service, index) => (
          <Card key={index} style={styles.serviceCard}>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Avatar alt={service.name} src={service.image} />
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  {service.name}
                </Typography>
              </div>
              <Typography variant="h8" component="div">
                {service.name}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={service.progress}
                color="primary"
                style={styles.progressBar}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
