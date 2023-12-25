import Container from '../../containers/containers';
import './ThumbnailCarousel.scss';
import { useState, useContext, useRef, useCallback, useEffect } from 'react';
import { MenuContext } from '../../../provider/MenuProvider';
import CurrentProject from './CurrentProject';
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from '../../page-transition/PageTransition';
import Label from '../../label/Label';

const ThumbnailCarousel = () => {
    const [drag, setDrag] = useState(false);
    const [startX, setStartX] = useState(null);
    const [posX, setPosX] = useState(0);
    const { index } = useParams()

    const [curIndex, setCurIndex] = useState(index);

    const { changeCursor, images } = useContext(MenuContext);
    const duplicatedImages = [...images, ...images, ...images, ...images];

    const carouselRef = useRef(null);
    const containerWidth = carouselRef.current && carouselRef.current.offsetWidth;
    const width = duplicatedImages.length * 60 + duplicatedImages.length * 10 - containerWidth - 10;
    const initialLoadedStates = Object.fromEntries(duplicatedImages.map((_, index) => [index, false]));
    const [loadedStates, setLoadedStates] = useState({ initialLoadedStates });

    const isValidIndex = !isNaN(index) && index >= 0 && index < duplicatedImages.length;

    const navigate = useNavigate();



    const handleMouseDown = useCallback((data) => {
        setDrag(true);
        setStartX(data);
    }, [posX, curIndex, startX]);

    const handleMouseMove = useCallback((data) => {
        if (!drag) return;

        let deltaX = data - startX;
        let newPos = posX + deltaX;

        if (newPos > 0) {
            newPos = 0;
        } else if (newPos <= -width) {
            newPos = 0;
            deltaX = 0;
            setPosX(0);
            setCurIndex(0);
            setStartX(0);
            setDrag(false);
        }

        const currentIndex = Math.floor(-newPos / 70);

        setTimeout(() => {
            setCurIndex(currentIndex);
        }, 500);


        setPosX(newPos);
        setStartX(data);

    }, [startX, posX, curIndex]);


    const handleMouseUp = useCallback(() => {
        setDrag(false);

    }, [curIndex, posX, startX]);

    const handleImageLoad = (index) => {

        setLoadedStates(prevStates => ({
            ...prevStates,
            [index]: true,
        }));

    };


    useEffect(() => {
        navigate(`?index=${curIndex}`, { replace: true });
    }, [curIndex]);

    useEffect(() => {
        if (!isValidIndex) {
            navigate('/home/0'); // Замените '/error' на путь к вашей странице с ошибкой
        }
    }, [isValidIndex]);

    const renderList = duplicatedImages.map((image, index) => (
        <li key={index}
            style={{
                transform: `translateX(${posX}px)`,
                filter: drag ? 'grayscale(1)' : 'none',

            }}
        >
            <div className="image" style={{ scale: drag ? '90%' : 'none', }}>
                {!loadedStates[index] && (
                    <div className='image-loader'  >
                        {`[Loading...]`}
                    </div>
                )}
                <img loading="lazy" onLoad={() => handleImageLoad(index)} src={image} alt={`img-${index + 1}`} />
            </div>
        </li>
    ));

    return (
        <PageTransition id='thumbnail-carousel'>

            <Container>
                <div className="thumbnail-carousel" ref={carouselRef}>
                    <ul
                        style={{ cursor: drag ? 'grabbing' : 'grab' }}
                        onMouseDown={(e) => {
                            handleMouseDown(e.clientX);
                        }}
                        onMouseMove={(e) => {
                            handleMouseMove(e.clientX);
                        }}
                        onMouseUp={() => handleMouseUp()}
                        onTouchStart={(e) => handleMouseDown(e.touches[0].clientX)}
                        onTouchMove={(e) => handleMouseMove(e.touches[0].clientX)}
                        onTouchEnd={() => handleMouseUp()}
                        onTouchCancel={() => handleMouseUp()}
                        onMouseEnter={() => changeCursor(true)}
                        onMouseLeave={() => {
                            changeCursor(false);
                            handleMouseUp();
                        }}
                    >
                        {renderList}
                    </ul>
                </div>
                <CurrentProject isValidIndex={isValidIndex} index={curIndex} images={duplicatedImages}   ></CurrentProject>
            </Container>
            <Label></Label>
        </PageTransition>
    );
};

export default ThumbnailCarousel;
