import { Route, Routes, BrowserRouter } from "react-router-dom";

import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import CreateFeed from "../Components/CreateFeed/CreateFeed";
import MyFeed from "../Components/MyFeed/MyFeed";
import MyProfileEdit from "../Components/MyFeed/MyProfileEdit";
import Home from "../Components/Home/Home";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/createFeed" element={<CreateFeed />} />
                <Route path="/myFeed" element={<MyFeed />} />
                <Route path="/MyProfileEdit" element={<MyProfileEdit />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;