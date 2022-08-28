import { Suspense, lazy } from "react";

const MyFeedHeader = lazy(() => import('./MyFeedHeader'));
const MyFeedMain = lazy(() => import('./MyFeedMain'));
const MyFeedSubHeader = lazy(() => import('./MyFeedSubHeader'));

const MyFeed = () => {
    return (
        <>
            <MyFeedHeader />
            <MyFeedSubHeader />
            <MyFeedMain />
        </>
    )
}

export default MyFeed;