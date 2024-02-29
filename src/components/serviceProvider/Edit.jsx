import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Container from "@mui/material/Container";

const Edit = () => {
  const styles = {
    adduser: {
      width: "400px",
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0.1, 0.1, 0.1, 0.1)",
      borderRadius: "15px",
      margin: "75px auto",
      padding: "50px",
      alignItems: "center",
      justifyContent: "center",
    },

    addUserForm: {
      marginTop: "20px",
    },
    fileds: {
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e4f5fc",
      borderRadius: "10px",
      border: "none",
      height: "35px",
      fontSize: "0.9rem",
    },
    label_field: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginBottom: "12px",
    },
    labels: {
      marginBottom: "1px",
      //fontWeight: "bold",
      fontSize: "0.85rem",
    },
    editbtn: {
      backgroundColor: "#2962ff",
      marginTop: "1.6rem",
    },
  };
  const providers = {
    spname: "",
    spmobile: "",
    spaddress: "",
    spcity: "",
    spemail: "",
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(providers);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProvider({ ...provider, [name]: value });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`http://localhost:8000/api/service-providers/getone/${id}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        setProvider(response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });

    // Cleanup function to cancel the previous request
    return () => {
      source.cancel("Cleanup: Request canceled");
    };
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/service-providers/update/${id}`, provider)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/providerhome");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      sx={{
        background: "#f2f2f7",
        minHeight: "99vh",
        border: "1px solid #f2f2f7",
      }}
    >
      <div style={styles.adduser}>
        <Link to={"/providerhome"}>{"<<"}Back</Link>
        <h3 style={{ textAlign: "center" }}>Update user</h3>
        <form onSubmit={submitForm} style={styles.addUserForm}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={styles.label_field}>
              <label htmlFor="fname" style={styles.labels}>
                First name
              </label>
              <input
                style={styles.fileds}
                type="text"
                value={provider.fname}
                onChange={inputChangeHandler}
                id="name"
                name="fname"
                autoComplete="off"
                placeholder="First name"
              />
            </div>
            <div style={styles.label_field}>
              <label htmlFor="lname" style={styles.labels}>
                Last name
              </label>
              <input
                style={styles.fileds}
                type="text"
                value={provider.lname}
                onChange={inputChangeHandler}
                id="name"
                name="lname"
                autoComplete="off"
                placeholder="Last name"
              />
            </div>
          </div>

          <div style={styles.label_field}>
            <label htmlFor="mobile" style={styles.labels}>
              Mobile no
            </label>
            <input
              style={styles.fileds}
              type="text"
              value={provider.mobile}
              onChange={inputChangeHandler}
              id="mobile"
              name="mobile"
              autoComplete="off"
              placeholder="mobile no"
            />
          </div>

          <div style={styles.label_field}>
            <label htmlFor="location" style={styles.labels}>
              Address
            </label>
            <input
              style={styles.fileds}
              type="text"
              value={provider.location}
              onChange={inputChangeHandler}
              id="address"
              name="location"
              autoComplete="off"
              placeholder="address"
            />
          </div>

          <div style={styles.label_field}>
            <label htmlFor="city" style={styles.labels}>
              City
            </label>
            <input
              style={styles.fileds}
              type="text"
              value={provider.city}
              onChange={inputChangeHandler}
              id="city"
              name="city"
              autoComplete="off"
              placeholder="city"
            />
          </div>

          <div style={styles.label_field}>
            <label htmlFor="email" style={styles.labels}>
              Email
            </label>
            <input
              style={styles.fileds}
              type="email"
              value={provider.email}
              onChange={inputChangeHandler}
              id="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={styles.label_field}>
              <label htmlFor="gender" style={styles.labels}>
                Gender
              </label>
              <input
                style={styles.fileds}
                type="text"
                value={provider.gender}
                onChange={inputChangeHandler}
                id="email"
                name="gender"
                autoComplete="off"
                placeholder="gender"
              />
            </div>
            <div style={styles.label_field}>
              <label htmlFor="age" style={styles.labels}>
                Age
              </label>
              <input
                style={styles.fileds}
                type="number"
                value={provider.age}
                onChange={inputChangeHandler}
                id="email"
                name="age"
                autoComplete="off"
                placeholder="age"
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              style={styles.editbtn}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default Edit;
