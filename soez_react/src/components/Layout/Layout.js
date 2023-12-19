import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh"
        }}>
            <div style={{
                flex: "1"
            }}>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;