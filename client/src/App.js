import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes ,Navigate} from "react-router-dom";

import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import Header from "./components/Header";
import AddApartment from "./components/AddApartment";
import ApartmentList from "./components/ApartmentList";
import ApartmentSearch from "./components/ApartmentSearch";
import Login from "./components/Login";
import { useAuth } from "./AuthProvider";
import Registration from "./components/Registration";
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EmailVerification from './components/EmailVerification'; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  return (
    <Fragment>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/verify-email/:token" element={<EmailVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route
              path="/registration"
              element={isAuthenticated ? <Navigate to="/" /> : <Registration />}
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />

            <Route
              path="/upload"
              element={!isAuthenticated ? <Login /> : <AddApartment />}
            />
            <Route path="/listings" element={<ApartmentList />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
