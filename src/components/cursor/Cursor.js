import './Cursor.scss'
import { useContext } from 'react'
import { MenuContext } from '../../provider/MenuProvider'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactDOM from 'react-dom'
function Cursor(props) {

    const outerRef = useRef(null)

    const innerRef = useRef(null)

    const { cursorStyle } = useContext(MenuContext)



    const className2 = `cursor-inner ${cursorStyle ? 'entered' : cursorStyle === null ? 'modal-entered' : ''}`;
    const className1 = `cursor-outer ${cursorStyle ? 'entered' : cursorStyle === null ? 'modal-entered' : ''}`;

    return <>
        {
            ReactDOM.createPortal(
                <>
                    <div ref={innerRef} className={className2} style={{

                        transform: `translate(
        ${innerRef.current && props.positions.posX - innerRef.current.offsetWidth / 2}px,
    ${innerRef.current && props.positions.posY - innerRef.current.offsetHeight / 2}px)`
                    }}>

                        <AnimatePresence mode='wait'>
                            {
                                cursorStyle === 3 && <motion.div
                                    initial={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }}
                                    animate={{ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }}
                                    exit={{ opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }}
                                    transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1], delay: 0.3 }}

                                    className='open-prompt'>{`[open]`}</motion.div>
                            }
                        </AnimatePresence>
                    </div>


                    <div ref={outerRef} className={className1} style={{

                        transform: `translate(
${outerRef.current && props.positions.posX - outerRef.current.offsetWidth / 2}px,
${outerRef.current && props.positions.posY - outerRef.current.offsetHeight / 2}px)`
                    }}>

                    </div>
                </>, document.getElementById('cursor-root')
            )
        }


    </>
}

export default Cursor