import { Route, Routes } from "react-router-dom";
import {lazy} from "react"

import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import CreateFeed from "../Components/CreateFeed/CreateFeed";
import MyFeed from "../Components/MyFeed/MyFeed";
import Edit from "../Components/MyFeed/Edit";

const Home = lazy(() => import('../Components/Home/Home'));

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/createFeed" element={<CreateFeed />} />
            <Route path="/myFeed" element={<MyFeed />} />
            <Route path="/Edit" element={<Edit />} />
        </Routes>
    )
}

export default Router;