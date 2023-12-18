import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import '../../styles/Layout.css'

const Layout = () => {
    return (
        <>
            <div>
                <Header />
                <Footer />
            </div>
            <Outlet/>
        </>
    )
}

export default Layout;