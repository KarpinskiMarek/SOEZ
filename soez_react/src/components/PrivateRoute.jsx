import {getAuthToken, isLoggedIn} from "../service/AuthenticationService";
import {Navigate, Outlet, Route, useNavigate} from "react-router-dom";
import React from "react";
import Login from "./Auth/Login";


const PrivateRoute = () => {
    const auth = isLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;