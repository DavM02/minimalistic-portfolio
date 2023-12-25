import { useEffect, useState, useContext } from 'react';
import { MenuContext } from '../../../provider/MenuProvider';
import data from '../../../data/data.json'
import { AnimatePresence, motion } from 'framer-motion';
import NextProject from './NextProject';
function ModalData(props) {


    const Arr = Object.values(data);
    const [text, setText] = useState(Arr[props.i % Arr.length].description)
    const {allowNext, updateAllowNext} = useContext(MenuContext)
    const [allAnimationComplete, setAllAnimationComplete] = useState([])

    useEffect(() => {
        const words = text.split(' ');
        const lines = [];

        for (let i = 0; i < words.length; i += 6) {
            const line = words.slice(i, i + 6).join(' ');
            lines.push(line);
        }
        lines.push(`creation date: ${Arr[props.i % Arr.length].creation_date};`,
            'references:',
            ...Arr[props.i % Arr.length].references,
            'color palette:',
            ...Arr[props.i % Arr.length].color_palette.map(color => {
                return <>
                    {color.name}: <span style={{ backgroundColor: `${color.code}` }} className='color-display'></span>
                </>
            }),
        )

        setText(lines);
    }, [props.i]);

    useEffect(() => {
        if (allAnimationComplete.length > 0 && allAnimationComplete.length === text.length) {
            updateAllowNext(true)
 
        }  
    }, [allAnimationComplete, text])

    return <div className="modal-data">
        <div style={{ height: '80px' }}>
            <AnimatePresence mode='wait'>
                {
                    props.showImage && <motion.h3
                        key={'heading'}
                        initial={{ opacity: 0, transform: 'translateY(7px)' }}
                        animate={{ opacity: 1, transform: 'translateY(0px)' }}
                        exit={{ opacity: 0, transform: 'translateY(7px)' }}
                        transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1] }} >
                        {Arr[props.i % Arr.length].project_name}
                    </motion.h3>
                }
            </AnimatePresence>
        </div>
        <div className='text'>
            {
                Array.isArray(text) && text.length > 0 && text.map((line, i) => (

                    <div className='text-line' key={i}>
                        <AnimatePresence mode='wait' key={i}>
                            {props.showImage && <motion.div
                                initial={{ opacity: 0, transform: 'translateY(7px)' }}
                                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                                exit={{ opacity: 0, transform: 'translateY(7px)' }}
                                transition={{ duration: 0.5, ease: [0.86, 0, 0.07, 1], delay: i * 0.1 }}
                                onAnimationComplete={() => setAllAnimationComplete(prevArr => [...prevArr, 1])}
                                key={i}>
                                {line}
                            </motion.div>}
                        </AnimatePresence>
                    </div>

                ))
            }

        </div>
        <NextProject
            setSelectedItemIndex={props.setSelectedItemIndex}
            i={props.i}
            showImage={props.showImage}
            setText={setText}
            Arr={Arr}
            allowNext={allowNext}
            setAllAnimationComplete={setAllAnimationComplete}

        ></NextProject>
    </div>
}

export default ModalData