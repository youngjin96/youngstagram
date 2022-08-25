import { Suspense, lazy } from "react";

import Loader from "../../Env/Loader";

const Header = lazy(() => import('./HomeHeader'));
const HomeMain = lazy(() => import('./HomeMain'));

const Home = () => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Header />
                <HomeMain />
            </Suspense>
        </>
    )
}

export default Home;