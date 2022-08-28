import { Suspense, lazy } from "react";

import Loader from "../../Env/Loader";

const HomeMain = lazy(() => import('./HomeMain'));
const HomeHeader = lazy(() => import('./HomeHeader'));

const Home = () => {
    return (
        <Suspense fallback={<Loader />}>
            <HomeHeader />
            <HomeMain />
        </Suspense>
    )
}

export default Home;