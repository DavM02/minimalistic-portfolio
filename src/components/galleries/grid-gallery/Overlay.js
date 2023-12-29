import { AnimatePresence, motion } from "framer-motion";
import { useState, useContext, useEffect } from "react";
import { MenuContext } from "../../../provider/MenuProvider";
import ModalData from "./ModalData";
import { useNavigate, useLocation } from "react-router-dom";

function Overlay(props) {

    const [showImage, setShowImage] = useState(false)

    const { changeCursor, updateAllowNext, allowNext } = useContext(MenuContext)
    const location = useLocation()
    const currentPathname = location.pathname
    const navigate = useNavigate()
    const [addOpacity, setAddOpacity] = useState(false)
    useEffect(() => {
        const handlePopstate = (e) => {
            if (location.pathname === '/grid-gallery' && location.search.trim().length > 0) {
                setShowImage(false)
                changeCursor(false)
                // navigate(currentPathname, { replace: false });
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [location.pathname, location.search]);

    useEffect(() => {
        const handlePopstate = (e) => {
            if (props.showOverlay) {
                setAddOpacity(true)
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
            setAddOpacity(false)
        };

    }, [props.showOverlay])

    return <AnimatePresence mode="wait">
        {
            props.showOverlay && <motion.div
                style={{ opacity: addOpacity ? "0" : '1' }}
                onMouseEnter={() => changeCursor(null)}
                onMouseLeave={() => changeCursor(false)}
                key={'overlay'}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0 0 0 0 )' }}
                exit={{ clipPath: 'inset(100% 0 0 0)' }}
                onAnimationComplete={() => props.animationState ? setShowImage(true) : props.setIsTransparent(false)}
                transition={{ duration: 1.5, ease: [0.86, 0, 0.07, 1] }} // Задержка в секундах
                className="overlay">
                <div className="modal-layout">
                    <div className="close-modal"
                        onMouseEnter={() => changeCursor(true)}

                        onMouseLeave={() => changeCursor(null)}

                        onClick={(e) => {
                            if (allowNext) {
                                setShowImage(false)
                                changeCursor(false)
                                navigate(currentPathname, { replace: true });
                                updateAllowNext(false)
                            }

                        }
                        }>Close</div>
                    <div className="modal-image">
                        <AnimatePresence mode="wait">
                            {showImage && (
                                <motion.div
                                    key={'modal-image'}
                                    initial={{ clipPath: 'inset(100% 0 0 0)' }}
                                    animate={{ clipPath: 'inset(0 0 0 0 )' }}
                                    exit={{ clipPath: 'inset(100% 0 0 0)' }}
                                    transition={{ duration: 1.5, ease: [0.86, 0, 0.07, 1] }}
                                    className="selected-image"
                                    onAnimationComplete={() => {
                                        props.setAnimationState(false)
                                        if (props.animationState === false) {
                                            props.setShowOverlay(false)
                                        }
                                    }}
                                >
                                    <img src={props.imgSrc} alt="selected" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <ModalData i={props.i}
                        showImage={showImage}
                        animationState={props.animationState}
                        setShowOverlay={props.setShowOverlay}
                        setSelectedItemIndex={props.setSelectedItemIndex}
                    ></ModalData>

                </div>
            </motion.div>
        }
    </AnimatePresence >
}

export default Overlay