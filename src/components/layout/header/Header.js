import { Center } from '../../containers/containers'
import './Header.scss'
import Menu from './Menu'
import Toggle from './Toggle'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion'

function Header(props) {


    const query = useMediaQuery({
        query: '(max-device-height: 470px)'
    });


    const [menu, setMenu] = useState(false)
    const [allowToggle, setAllowToggle] = useState(true)
    const [overflow, setOverflow] = useState(false)
    function revealMenu() {

        if (allowToggle) {
            setAllowToggle(false)
            setMenu(!menu)
            props.hideScroll()

        }
    }

    useEffect(() => {
        const handlePopstate = (e) => {
            if (menu) {
                setAllowToggle(false)
                setMenu(!menu)
                props.hideScroll()
            }
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [menu]);

    useEffect(() => {
        if (query && menu) {
            setOverflow(true)
        }
    }, [window.innerHeight])

    return <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
            pointerEvents: menu ? 'all' : 'none',
            overflow: overflow ? 'auto' : 'initial'

        }}>
        <div className='header-inner'>
            <Center>
                <Toggle onRevealMenu={revealMenu} menu={menu} ></Toggle>
            </Center>
        </div>
        <Menu menu={menu} onRevealMenu={revealMenu} query={query} ></Menu>


        <div className='header-outer'
            onTransitionEnd={() => {
                setAllowToggle(true);
                query && menu ? setOverflow(true) : setOverflow(false)
            }}
            style={
                {
                    clipPath: menu ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',

                }
            }>

        </div>


    </motion.header>



}

export default Header