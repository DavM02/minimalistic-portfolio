import './App.css';
import Cursor from './components/cursor/Cursor';
import { MenuContext } from './provider/MenuProvider';
import Header from './components/layout/header/Header';
import { useState, useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import PageEntrance from './components/page-entrance/PageEntrance';
import RoutesComponents from './pages/RoutesComponents';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
 

function App() {
  const { isLoading } = useContext(MenuContext)
  const [hideOverflow, setHideOverflow] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  });

  const [posX, setPosX] = useState(null)
  const [posY, setPosY] = useState(null)

  const location = useLocation()


  function updateCursor(e) {
    setPosX(e.clientX)
    setPosY(e.clientY)
  }

  function hideScroll() {
    setHideOverflow(!hideOverflow)
  }

 
  return (

    <>
      <PageEntrance></PageEntrance>
      {
        isLoading >= 65 &&
        <>
          <div className={`App ${location.pathname.includes('/grid-gallery') || location.pathname.includes('/list-display') ? 'smoothed' : 'no-smooth'}`}

            style={{ overflowY: hideOverflow ? 'hidden' : 'auto' }}
            onMouseMove={(e) => updateCursor(e)}>
                          {isDesktopOrLaptop &&
              <Cursor positions={{
                posX,
                posY
              }}></Cursor>
            }
            <AnimatePresence mode="wait">
              {
                (location.key !== 'default' || location.pathname === '/home/0'  || location.pathname === '/grid-gallery') &&
                <Header hideScroll={hideScroll}></Header>
              }
            </AnimatePresence>
            <main>

              <RoutesComponents
                isDesktopOrLaptop={isDesktopOrLaptop}
                positions={{
                  posX,
                  posY
                }}
              ></RoutesComponents>
            </main>
            


          </div>
          <div id='modal-root'></div>
          <div className='noise-texture'></div>
          </>
      }
    </>

  );
}

export default App;
