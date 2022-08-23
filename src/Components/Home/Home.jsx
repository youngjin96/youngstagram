import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import Header from "./Header";

const Home = () => {
    
    useEffect(() => {
        const uid = sessionStorage.getItem("user_id");
        if (!uid) {
            alert("로그인 후 이용해주세요.");
            window.location.replace("/");
        }
    }, []);

    return (
        <Header />
    )
}

export default Home;