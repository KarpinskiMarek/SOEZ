import {isLoggedIn} from "../service/AuthenticationConfig";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";


const PrivateRoute = () => {
    const auth = isLoggedIn();
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;