import { useState, useRef, useCallback, useEffect, useContext } from 'react';
import { MenuContext } from '../../../provider/MenuProvider';
import LinkItem from './LinkItem';
import PageTransition from '../../page-transition/PageTransition';
import './FullScreenDisplay.scss';
import { useMediaQuery } from 'react-responsive';

function FullScreenDisplay() {
    const [drag, setDrag] = useState(false);
    const [startX, setStartX] = useState(null);
    const [posX, setPosX] = useState(0);
    const [isLastElementVisible, setIsLastElementVisible] = useState(false);
    const [thumbnailWidth, setThumbnailWidth] = useState(false)
    const ulRef = useRef(null);
    const { changeCursor } = useContext(MenuContext)
    const scrollbarRef = useRef(null);
    const ulWidth = 285 * 40 + 390;


    const isDesktop = useMediaQuery({
        query: '(min-device-width: 824px)'
    });


    const handleMouseDown = useCallback((data) => {
        setDrag(true);
        setStartX(data);
    }, [posX, startX]);

    const handleMouseMove = useCallback((data) => {
        if (!drag) return;

        let deltaX = data - startX;
        let newPos = posX + deltaX;

     

        if (!isDesktop) {
            if (newPos > 0) {
                newPos = 0;
            }
        } else {
            if (newPos < 0) {
                newPos = 0;
            }

        }

        setPosX(newPos);
        setStartX(data);
    }, [startX, posX]);


    const handleMouseUp = useCallback(() => {
        setDrag(false);

    }, [posX, startX]);

    const scrollbarWidth = scrollbarRef.current && scrollbarRef.current.offsetWidth;


    useEffect(() => {
        changeCursor(false)
    }, [])


    const handleIntersection = (entries) => {
        const lastEntry = entries[entries.length - 1];
        const isFullyVisible = lastEntry.isIntersecting && lastEntry.intersectionRatio === 1.0;

        if (isFullyVisible) {
            setPosX(0);
            setStartX(0);
            setDrag(false);
        }

        setIsLastElementVisible(lastEntry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0, // Adjust as needed
        });

        const lastElement = ulRef.current.lastElementChild;
        if (lastElement) {
            observer.observe(lastElement);
        }

        return () => {
            if (lastElement) {
                observer.unobserve(lastElement);
            }
        };
    }, []);




    useEffect(() => {
        const updateThumbnailWidth = () => {
            const scrollbarWidth = scrollbarRef.current && scrollbarRef.current.offsetWidth;
            const thumbnailWidth = (scrollbarWidth / ulWidth) * scrollbarWidth;
            setThumbnailWidth(thumbnailWidth);
            setPosX(0);
            setStartX(0);
            setDrag(false);
        };

        // Вызывайте функцию обновления ширины thumbnail при монтировании компонента
        updateThumbnailWidth();

        // Добавьте слушатель события resize для обновления ширины thumbnail при изменении размеров окна
        window.addEventListener('resize', updateThumbnailWidth);

        // Очистите слушатель события при размонтировании компонента
        return () => {
            window.removeEventListener('resize', updateThumbnailWidth);
        };
    }, [ulWidth]); // Зависимость от ulWidth гарантирует обновление thumbnail при изменении этого значения

    function mouseWheelHandler(e) {
        // Получаем значение прокрутки
        const delta = e.deltaY;

        // Обрабатываем прокрутку, например, изменяем позицию на основе delta
        const newPos = posX + delta;

        // Убеждаемся, что новая позиция находится в пределах допустимых значений
        if (newPos < 0) {
            setPosX(0);
        } else if (newPos > ulWidth - scrollbarWidth) {
            setPosX(ulWidth - scrollbarWidth);
        } else {
            setPosX(newPos);
        }

        // Останавливаем стандартное поведение прокрутки страницы

    }

    return (
        <PageTransition id="full-screen-display"
            onMouseUp={() => handleMouseUp()}
            onTouchCancel={() => isDesktop && handleMouseUp()}
            onTouchEnd={() => isDesktop && handleMouseUp()}
            onTouchMove={(e) => isDesktop && 
                handleMouseMove(e.touches[0].clientX)
             }
            onMouseMove={(e) => {
                handleMouseMove(e.clientX);
            }}

            onWheel={(e) => isDesktop && mouseWheelHandler(e)}
        > {
                isDesktop && <div
                    className="custom-scrollbar"
                    ref={scrollbarRef}

                >
                    <div
                        className="custom-scrollbar-thumb"

                        style={{
                            cursor: drag ? 'grabbing' : 'grab',
                            width: `${thumbnailWidth}px`, // устанавливаем ширину thumbnail
                            left: `${(100 * posX) / scrollbarWidth}%`,
                            opacity: drag ? '100%' : '70%',
                            scale: drag ? '90%' : 'none',
                        }}
                        onMouseDown={(e) => {
                            handleMouseDown(e.clientX);
                        }}
                        onMouseUp={() => handleMouseUp()}
                        onTouchStart={(e) => handleMouseDown(e.touches[0].clientX)}
                        onTouchCancel={() => handleMouseUp()}
                        onTouchEnd={() => handleMouseUp()}
                    ></div>
                </div>
            }

            <ul ref={ulRef}
                onTouchStart={(e) => !isDesktop && handleMouseDown(e.touches[0].clientX)}
                onTouchMove={(e) => !isDesktop && handleMouseMove(e.touches[0].clientX)}
                onTouchEnd={() => !isDesktop && handleMouseUp()}
                onTouchCancel={() => !isDesktop && handleMouseUp()}
            >
                <LinkItem
                    drag={drag}
                    posX={posX}
                    scrollbarWidth={scrollbarWidth}
                    isDesktop={isDesktop}

                ></LinkItem>
            </ul>
        </PageTransition>
    );
}

export default FullScreenDisplay;
