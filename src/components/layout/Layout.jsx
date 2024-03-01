import React, {Suspense} from 'react';
import {Outlet} from "react-router-dom";
import classes from "./style.module.css";
import Footer from "./footer/Footer.jsx";
import Header from "./header/Header.jsx";
const Layout = () => {
    return (
        <div className={classes.layoutS}>
            <Header/>
            <div className={classes.page}>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet/>
                </Suspense>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;