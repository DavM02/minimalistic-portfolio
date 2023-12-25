import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuContext } from "../../../provider/MenuProvider";
import ReactDOM from "react-dom";

function ListCursor(props) {
    const { images } = useContext(MenuContext);
    const cursorImgArr = images;

    const currentIndex = props.pathIndex % cursorImgArr.length;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {props.showCursorImg && (
                <motion.div
                    initial={{ clipPath: 'inset(50% 50% 50% 50%)' }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                    exit={{ clipPath: 'inset(50% 50% 50% 50%)' }}
                    transition={{ duration: 0.5, delay: 0.3 }} // Задержка в секундах
                    style={{
                        transform: `translate(-50%, -50%) translate(${props.positions.posX}px, ${props.positions.posY}px)`
                    }}
                    className="list-cursor"
                >
                    <div className="cursor-images">
                        {cursorImgArr.map((img, i) => (
                            <img
                                style={{
                                    clipPath:
                                        currentIndex !== i
                                            ? "inset(0 0 0 100%)"
                                            : "inset(0 0 0 0)"
                                }}
                                src={img}
                                key={i}
                                alt={`img-${i + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.getElementById('cursor-root')
    );
}

export default ListCursor;
