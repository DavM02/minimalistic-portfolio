import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuContext } from "../../../provider/MenuProvider";
import SmoothScrollbar from "smooth-scrollbar";
function NextProject(props) {
    const { changeCursor, images, updateAllowNext } = useContext(MenuContext)
    const duplicatedImages = [...images, ...images]
    const navigate = useNavigate()
    useEffect(() => {
        navigate(`?index=${props.i % props.Arr.length}`, { replace: true });
    }, [props.i]);



    return <>
        <AnimatePresence mode="wait">
            {
                props.showImage && <motion.div
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0, }}
                    transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1] }}
                    className="next-project">
                    <div className="next-project-image">
                        <img src={duplicatedImages[props.i % props.Arr.length + 1]} />
                    </div>
                    <div className="switch-to-next"
                        onMouseEnter={() => changeCursor(true)}

                        onMouseLeave={() => changeCursor(null)}
                        onClick={() => {
                            if (props.allowNext) {

                                props.setSelectedItemIndex(props.i % props.Arr.length + 1);
                                props.setText(props.Arr[(props.i + 1) % props.Arr.length].description)

                                updateAllowNext(false)
                                props.setAllAnimationComplete([])
                            }
                        }} >
                        Next
                        <br /> Project

                    </div>
                </motion.div>
            }
        </AnimatePresence>
    </>
}

export default NextProject