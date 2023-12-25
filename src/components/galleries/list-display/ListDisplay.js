import './ListDisplay.scss';
import { useContext } from 'react';
import { MenuContext } from '../../../provider/MenuProvider';
import data from '../../../data/data.json';
import Container from '../../containers/containers';
import { useState, useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';

import ListCursor from './ListCursor';
import { Link } from 'react-router-dom';
import PageTransition from '../../page-transition/PageTransition';
import SmoothWrapper from '../../smoothWrapper/SmoothWrapper';
import Label from '../../label/Label';

function ListDisplay(props) {
    const Arr = Object.values(data);
    const [showCursorImg, setShowCursorImg] = useState(false)

    const {changeCursor} = useContext(MenuContext)
    const duplicatedArr = [...Arr, ...Arr, ...Arr, ...Arr]
    const [pathIndex, setPathIndex] = useState(0)
    useEffect(() => {
        changeCursor(false)
        setShowCursorImg(true)
    }, [])

 

    return (
        <PageTransition  id='list-display'>  
 
<SmoothWrapper>
<Container>
                    {props.isDesktopOrLaptop &&
                        <ListCursor positions={props.positions}
                            pathIndex={pathIndex}
                            showCursorImg={showCursorImg} />}
                    <ul >
                        {duplicatedArr.map((item, i) => (
                            <li key={i} className='list-item'
                                onMouseMove={() => setPathIndex(i)}
                                onMouseEnter={() => setShowCursorImg(true)}
                                onMouseLeave={() => setShowCursorImg(false)}
                            >

                                <Link to={`/home/${i}`}>
                                    <h4>{i}</h4>
                                    <span>project name:</span>
                                    <h4>{duplicatedArr[i].project_name}</h4>

                                    <span>creation date:</span>
                                    <span> {duplicatedArr[i].creation_date};</span>

                                    <span>references:</span>
                                    <p>{duplicatedArr[i].references.join(', ')};</p>

                                    <span>color palette:</span>
                                    <p className='colors-display'>
                                        {duplicatedArr[i].color_palette.map((color, index) => (
                                            <span key={index}>
                                                {color.name}: <span style={{ backgroundColor: `${color.code}` }} className='color-display'></span>
                                            </span>
                                        ))}
                                    </p>
                                </Link>

                            </li>
                        ))}
                    </ul>
                </Container>
                <Label></Label>
</SmoothWrapper>
 
        </PageTransition>
    );
}

export default ListDisplay;
//  
