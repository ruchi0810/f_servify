// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Edit = () => {
//   const styles = {};
//   const providers = {
//     spname: "",
//     spmobile: "",
//     spaddress: "",
//     spcity: "",
//     spemail: "",
//   };
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [provider, setProvider] = useState(providers);
//   const inputChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setProvider({ ...provider, [name]: value });
//     console.log(provider);
//   };
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/service-providers/getone/${id}`)
//       .then((response) => {
//         setProvider(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const submitForm = async (e) => {
//     e.preventDefault();
//     await axios
//       .put(`http://localhost:8000/api/service-providers/update/${id}`, provider)
//       .then((response) => {
//         toast.success(response.data.msg, { position: "top-right" });
//         navigate("/");
//       })
//       .catch((error) => console.log(error));
//   };
//   return (
//     <div className="addUser" style={styles.adduser}>
//       <Link to={"/providerhome"}>Back</Link>
//       <h3>Update user</h3>
//       <form className="addUserForm" onSubmit={submitForm}>
//         <div className="inputGroup">
//           <label htmlFor="name">name</label>
//           <input
//             type="text"
//             // by default value lakhaine  aavi jaay edit ma
//             value={provider.spname}
//             onChange={inputChangeHandler}
//             id="name"
//             name="spname"
//             autoComplete="off"
//             placeholder="First name"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="mobile">Mobile no</label>
//           <input
//             type="text"
//             value={provider.spmobile}
//             onChange={inputChangeHandler}
//             id="mobile"
//             name="spmobile"
//             autoComplete="off"
//             placeholder="mobile no"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="address">Address</label>
//           <input
//             type="text"
//             value={provider.spaddress}
//             onChange={inputChangeHandler}
//             id="address"
//             name="spaddress"
//             autoComplete="off"
//             placeholder="address"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="city">City</label>
//           <input
//             type="text"
//             value={provider.spcity}
//             onChange={inputChangeHandler}
//             id="city"
//             name="spcity"
//             autoComplete="off"
//             placeholder="city"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             value={provider.spemail}
//             onChange={inputChangeHandler}
//             id="email"
//             name="spemail"
//             autoComplete="off"
//             placeholder="Email"
//           />
//         </div>

//         <div className="inputGroup">
//           <button type="submit">UPDATE USER</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Edit;

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
      borderRadius: "20px",
      border: "none",
      height: "35px",
    },
    label_field: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    labels: {
      marginBottom: "5px",
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
        <Link to={"/providerhome"}>Back</Link>
        <h3 style={{ textAlign: "center" }}>Update user</h3>
        <form onSubmit={submitForm} style={styles.addUserForm}>
          <div style={styles.label_field}>
            <label htmlFor="name" style={styles.labels}>
              name
            </label>
            <input
              style={styles.fileds}
              type="text"
              value={provider.spname}
              onChange={inputChangeHandler}
              id="name"
              name="spname"
              autoComplete="off"
              placeholder="First name"
            />
          </div>
          <div style={styles.label_field}>
            <label htmlFor="mobile" style={styles.labels}>
              Mobile no
            </label>
            <input
              style={styles.fileds}
              type="text"
              value={provider.spmobile}
              onChange={inputChangeHandler}
              id="mobile"
              name="spmobile"
              autoComplete="off"
              placeholder="mobile no"
            />
          </div>
          <div style={styles.label_field}>
            <label htmlFor="address" style={styles.labels}>
              Address
            </label>
            <input
              style={styles.fileds}
              type="text"
              value={provider.spaddress}
              onChange={inputChangeHandler}
              id="address"
              name="spaddress"
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
              value={provider.spcity}
              onChange={inputChangeHandler}
              id="city"
              name="spcity"
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
              value={provider.spemail}
              onChange={inputChangeHandler}
              id="email"
              name="spemail"
              autoComplete="off"
              placeholder="Email"
            />
          </div>
          <div>
            {/* <button type="submit" style={styles.editbtn}>
            UPDATE USER
          </button> */}
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
