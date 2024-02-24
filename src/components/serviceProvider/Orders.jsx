import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import { pink, blue, green } from "@mui/material/colors";
import Container from "@mui/material/Container";
import user_profile from "../../graphics/user_profile.jpg";

const Orders = () => {
  const [acceptedCards, setAcceptedCards] = useState([]);
  const [declinedCards, setDeclinedCards] = useState([]);

  const handleAccept = (index) => {
    // Perform any necessary actions when accepting the order
    setAcceptedCards((prevAcceptedCards) => [...prevAcceptedCards, index]);
  };

  const handleDecline = (index) => {
    // Perform any necessary actions when declining the order
    setDeclinedCards((prevDeclinedCards) => [...prevDeclinedCards, index]);
  };

  const styles = {
    cardOrders: {
      marginTop: "2rem",
      width: 900,
      alignItems: "center",
      borderRadius: "40px",
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)", // Shadow styling
    },
    declineBtn: {
      backgroundColor: "#bc000b",
    },
    acceptBtn: {
      backgroundColor: blue[500],
    },
    acceptedBtn: {
      backgroundColor: green[500],
    },
    hidden: {
      display: "none",
    },
    orders: {
      backgroundColor: "#f2f2f7",
    },
  };

  const isCardAccepted = (index) => acceptedCards.includes(index);
  const isCardDeclined = (index) => declinedCards.includes(index);

  const users = [
    {
      name: "Ruchi Shingala",
      address: "xyz",
      number: "9999999999",
      email: "xyz@gmail.com",
    },
    {
      name: "Kashyap Bavadiya",
      address: "abc",
      number: "1234567890",
      email: "xyz@gmail.com",
    },
    {
      name: "Jane Smith",
      address: "pqr",
      number: "9876543210",
      email: "xyz@gmail.com",
    },
    {
      name: "dhruv Smith",
      address: "pqr",
      number: "9876543210",
      email: "xyz@gmail.com",
    },
  ];

  const renderCard = (user, index) => {
    if (isCardDeclined(index)) {
      return null; // Do not render the card if it has been declined
    }

    return (
      <Card className="cardOrders" style={styles.cardOrders} key={index}>
        <div style={{ marginLeft: "2rem", padding: "0.8rem" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ bgcolor: pink[500] }}
                alt={user.name}
                src={user_profile}
              />
              <Typography style={{ marginLeft: "0.5rem", fontWeight: "bold" }}>
                {user.name}
              </Typography>
            </div>
            <Typography>address: {user.address}</Typography>
            <Typography>number: {user.number}</Typography>
            <Typography>email: {user.email}</Typography>
          </CardContent>
          <CardActions>
            {!isCardAccepted(index) && (
              <>
                <Button
                  style={styles.acceptBtn}
                  className="acceptbtn"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(index)}
                >
                  Accept
                </Button>
                <Button
                  style={styles.declineBtn}
                  className="declinebtn"
                  variant="contained"
                  onClick={() => handleDecline(index)}
                >
                  Decline
                </Button>
              </>
            )}
            {isCardAccepted(index) && (
              <Button
                style={styles.acceptedBtn}
                className="acceptedBtn"
                variant="contained"
                color="primary"
                disabled
              >
                Accepted
              </Button>
            )}
          </CardActions>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <h2>Today's Orders </h2>
      {users
        .slice()
        .reverse()
        .map((user, index) => renderCard(user, index))}
    </div>
  );
};

export default Orders;
