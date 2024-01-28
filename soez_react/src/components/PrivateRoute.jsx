import {getAuthToken} from "../service/AuthenticationService";
import {Navigate, Route} from "react-router-dom";
import React from "react";


const PrivateRoute = ({ element, ...rest }) => {
    return getAuthToken() ? (
        <Route {...rest} element={element}/>
    ) : (
        <Navigate to={"/login"} replace />
    );
}