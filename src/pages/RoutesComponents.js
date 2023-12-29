import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import IsLoading from "../components/loading/IsLoading";
import ErrorPage from "../components/error/ErrorPage";
const ThumbnailCarousel = lazy(() => import("../components/galleries/thumbnail-carousel/ThumbnailCarousel"));
const ListDisplay = lazy(() => import("../components/galleries/list-display/ListDisplay"));
const FullScreenDisplay = lazy(() => import("../components/galleries/full-screen-display/FullScreenDisplay"));
const GridGallery = lazy(() => import("../components/galleries/grid-gallery/GridGallery"));


function RoutesComponents(props) {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/home/:index"
                 
                    element={
                        <Suspense fallback={<IsLoading></IsLoading>}>
                            <ThumbnailCarousel />
                        </Suspense>
                    }
                ></Route>
                <Route path="/" element={<Navigate to="/home/0" />} />
                <Route
                    path="/list-display"
                    element={
                        <Suspense fallback={<IsLoading></IsLoading>}>
                            <ListDisplay {...props} />
                        </Suspense>
                    }
                ></Route>

                <Route path='/full-screen-display'
                    element={<Suspense fallback={<IsLoading></IsLoading>}>
                        <FullScreenDisplay />
                    </Suspense>}>

                </Route>
                <Route path='/grid-gallery'
                    element={<Suspense fallback={<IsLoading></IsLoading>}>
                        <GridGallery />
                    </Suspense>}></Route>
                <Route path='*' element={<ErrorPage />}></Route>
                <Route path='/no-found' element={<ErrorPage />}></Route>
            </Routes>
        </AnimatePresence>
    )
}

export default RoutesComponents;
