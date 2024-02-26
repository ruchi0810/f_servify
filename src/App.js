import { Box, Button } from "@mui/material";
import Header from "./components/Header";
import Slider from "./components/Slider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./components/PageNotFound";
import Service from "./components/Service";
import Signup from "./components/serviceProvider/Signup";
import Login from "./components/serviceProvider/Login";
import ProviderHome from "./components/serviceProvider/ProviderHome";
import EmailTaken from "./components/forgetPassword/EmailTaken";
import VerifyOTP from "./components/forgetPassword/VerifyOTP";
import PasswordReset from "./components/forgetPassword/PasswordReset";
import Recovered from "./components/forgetPassword/Recovered";
import Dashboard2 from "./components/serviceProvider/Dashboard2";
import Orders from "./components/serviceProvider/Orders";
import Edit from "./components/serviceProvider/Edit";
import UserBooking from "./components/user/userBooking";
import UserBookingStatus from "./components/user/userBookingStatus";
import FirebaseImageUpload from "./components/FirebaseImgUpload/FirebaseImageUpload";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/providerhome" element={<ProviderHome />} />
          <Route path="/service" element={<Service />} />
          <Route path="/providerlogin" element={<Login />} />
          <Route path="/providerlogin/forget" element={<EmailTaken />} />
          <Route path="/providerlogin/otpverify" element={<VerifyOTP />} />
          <Route path="/providerlogin/resetpass" element={<PasswordReset />} />
          <Route path="/providerlogin/recovered" element={<Recovered />} />
          <Route path="/providersignup" element={<Signup />} />
          <Route path="/providerhome/dashboard" element={<Dashboard2 />} />
          <Route path="/providerhome/Orders" element={<Orders />} />
          <Route path="/providerhome/edit/:id" element={<Edit />} />
          <Route path="/firebaseimg" element={<FirebaseImageUpload />} />
          <Route path="/userbooking" element={<UserBooking />}></Route>
          <Route
            path="/userbookingstatus"
            element={<UserBookingStatus />}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
