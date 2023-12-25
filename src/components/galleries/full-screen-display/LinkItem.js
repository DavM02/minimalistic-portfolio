import { useContext, useRef, useState, useEffect } from 'react'
import { createRef } from 'react'
import { MenuContext } from '../../../provider/MenuProvider'
import data from '../../../data/data.json'
import { Link } from 'react-router-dom'

function LinkItem(props) {
    const { images } = useContext(MenuContext);
    const Arr = Object.values(data);
    const duplicatedArr = [...Arr, ...Arr]
    const duplicatedImages = [...images, ...images];



    // const liRefs = useRef([])
    // liRefs.current = duplicatedArr.map((element, i) => liRefs.current[i] ?? createRef());


    return <>
        {duplicatedArr.map((item, i) => (
            <li key={i} className='list-item'
                // ref={liRefs.current[i]}
                style={{ left: 
                    props.isDesktop  ? `${(-100 * props.posX) / props.scrollbarWidth}%` : 
                      `${props.posX}px`   }}
            >
                <div className='full-screen-image'>
                    <img src={duplicatedImages[i]}

                        alt={`img=${i + 1}`}></img>
                </div>
                <Link to={`/home/${i}`} style={{ cursor: props.drag ? 'grabbing' : 'pointer' }}>

                    <div>
                        <h3>{duplicatedArr[i].project_name}</h3>


                        <span style={{ marginTop: '10px' }}>creation date:
                            <br /> {duplicatedArr[i].creation_date};
                        </span>

                        <span style={{ marginTop: '10px' }}>references:
                            <br />  {duplicatedArr[i].references.join(', ')};
                        </span>


                        <span style={{ marginTop: '10px' }}>color palette:</span>
                        <p className='colors-display'>
                            {duplicatedArr[i].color_palette.map((color, index) => (
                                <span key={index}>
                                    {color.name}: <span style={{ backgroundColor: `${color.code}` }} className='color-display'></span>
                                </span>
                            ))}
                        </p>
                    </div>
                    <h1>{i}</h1>
                </Link>

            </li>
        ))}
    </>
}

export default LinkItem