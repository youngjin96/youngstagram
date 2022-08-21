import { Route, Routes } from "react-router-dom";

import Home from "../Components/Home";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}

export default Router;