import { Suspense, lazy } from "react";

import Loader from "../../Env/Loader";

// const HomeMain = lazy(() => import('./HomeMain'));
// const HomeHeader = lazy(() => import('./HomeHeader'));

import HomeMain from "./HomeMain";
import HomeHeader from "./HomeHeader";

const Home = () => {
    return (
        <>
            <HomeHeader />
            <HomeMain />
        </>
    )
}

export default Home;