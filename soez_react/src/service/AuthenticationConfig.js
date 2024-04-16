import axios from "axios";

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
}

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem('auth_token', token);
    }else {
        window.localStorage.removeItem('auth_token');
    }
}

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const request = (method, url, data) => {

    let headers = {};

    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`}
    }

    console.log('header 26 service' + headers)

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    })
};

export const isLoggedIn = () => {
    const authToken = getAuthToken();

    return authToken !== null && authToken !== "null";
}

export const Logout = () => {
    window.localStorage.clear();
}