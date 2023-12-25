import { useRef, useLayoutEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';

function SmoothWrapper(props) {
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    let scrollbar;

    // Инициализируем скроллбар
    const initScrollbar = () => {
      scrollbar = Scrollbar.init(scrollRef.current, {
        damping: 0.06,
        alwaysShowTrack: true,
        renderByPixels: true,
 
      });
    };

    initScrollbar(); // Инициализируем скроллбар при монтировании

    // Функция очистки, вызывается при размонтировании компонента
    return () => {
      if (scrollbar) {
        // Уничтожаем скроллбар при размонтировании
        scrollbar.destroy();
      }
    };
  }, []);

  return (
    <div id="scroll-wrapper" ref={scrollRef}>
     {props.children} 
    </div>
  );
}

export default SmoothWrapper;
