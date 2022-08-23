import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import Header from "./Header";

const Home = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        setUserId(sessionStorage.getItem("user_id"))
    }, []);

    return (
        <Header />
    )
}

export default Home;