import PageTransition from "../../page-transition/PageTransition";
import './GridGallery.scss'
import { MenuContext } from "../../../provider/MenuProvider";
import { useContext, useState, } from "react";

import Overlay from "./Overlay";
import data from '../../../data/data.json'
import ReactDOM from "react-dom";


import SmoothWrapper from "../../smoothWrapper/SmoothWrapper";
import { AnimatePresence, motion } from "framer-motion";
import Label from "../../label/Label";

function GridGallery() {
    const Arr = Object.values(data);




    const { images, changeCursor } = useContext(MenuContext)

    const duplicatedImages = [...images, ...images]

    const initialLoadedStates = Object.fromEntries(duplicatedImages.map((_, index) => [index, false]));
    const [loadedStates, setLoadedStates] = useState({ initialLoadedStates });

    const handleImageLoad = (index) => {

        setLoadedStates(prevStates => ({
            ...prevStates,
            [index]: true,
        }));

    };


    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [animationState, setAnimationState] = useState(false)
    const [isTransparent, setIsTransparent] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false)

    function handleClick(e, i) {
        // Если клик произошел на уже выбранном элементе, сбросить selectedItemIndex в null
        setSelectedItemIndex(i);
        setAnimationState(true)
        setIsTransparent(true)
        // Остальной код остается без изменений

    }
    return <PageTransition id='grid-gallery'

    >
        {/* <Container> */}
        <SmoothWrapper>
            <div className='grid-wrapper'>
                {
                    duplicatedImages.map((img, i) => (
                        <div
                            key={i}
                            className={`grid-item ${isTransparent ? 'selected' : 'unselected'}`}
                            onMouseEnter={() => changeCursor(3)}
                            onMouseLeave={() => changeCursor(false)}
                            onTransitionEnd={() => animationState && setShowOverlay(true)}

                        >
                            <div className="grid-content"
                              style={{ opacity: !loadedStates[i] ? '0' : '1' }}
                                onClick={(e) => handleClick(e, i)}
                            >
                                <img src={duplicatedImages[i]}
                                  loading="lazy"
                                   onLoad={() => handleImageLoad(i)}
                                />
                                <p>{Arr[i % Arr.length].project_name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Label></Label>
        </SmoothWrapper>

        {/* </Container> */}
        {
            ReactDOM.createPortal(<Overlay
                i={selectedItemIndex}
                setSelectedItemIndex={setSelectedItemIndex}
                setIsTransparent={setIsTransparent}
                setShowOverlay={setShowOverlay}
                setAnimationState={setAnimationState}
                animationState={animationState}
                showOverlay={showOverlay}
                imgSrc={duplicatedImages[selectedItemIndex % Arr.length]}></Overlay>,
                document.getElementById('modal-root')
            )
        }

    </PageTransition>
}

export default GridGallery


