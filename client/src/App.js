import React, { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Switch,
  Redirect,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import Header from "./components/Header";
import AddApartment from "./components/AddApartment";
import ApartmentList from "./components/ApartmentList";
import ApartmentSearch from "./components/ApartmentSearch";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolen => {
    setIsAuthenticated(boolen);
  };

  return (
    <Fragment>
      <Router>
        <Header setAuth={setAuth}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route exact path="/registration" element={!isAuthenticated ? (<Registration setAuth={setAuth}/>) : (<HomePage />)} />
            <Route exact path="/login" element={!isAuthenticated ? (<Login setAuth={setAuth} />) : (<HomePage />) } />
            
            <Route path="/upload" element={!isAuthenticated ?( <Login setAuth={setAuth}/>) : (<HomePage />)} />
            <Route path="/listings" element={<ApartmentList />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
