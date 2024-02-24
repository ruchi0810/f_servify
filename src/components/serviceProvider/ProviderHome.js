import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import Profile from "./Profile";
import Orders from "./Orders";
import { Link, useNavigate } from "react-router-dom";

function ProviderHome() {
  const [selectedOption, setSelectedOption] = useState("profile");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Box
      sx={{
        background: "#f2f2f7",
        minHeight: "100vh", // Set a minimum height to cover the entire viewport
      }}
    >
      <div style={{ display: "flex" }}>
        <Drawer variant="permanent">
          <List>
            <ListItem
              button
              selected={selectedOption === "profile"}
              onClick={() => handleOptionClick("profile")}
            >
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              button
              selected={selectedOption === "dashboard"}
              onClick={() => handleOptionClick("dashboard")}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              selected={selectedOption === "todaysOrders"}
              onClick={() => handleOptionClick("todaysOrders")}
            >
              <ListItemText primary="Today's Orders" />
            </ListItem>
          </List>
        </Drawer>

        <div style={{ marginLeft: 240, padding: 20 }}>
          {selectedOption === "profile" && <Profile />}
          {selectedOption === "dashboard" && <Dashboard2 />}
          {selectedOption === "todaysOrders" && <Orders />}
        </div>
      </div>
    </Box>
  );
}

export default ProviderHome;
