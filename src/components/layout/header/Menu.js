import { Link } from 'react-router-dom'
import { MenuContext } from '../../../provider/MenuProvider'
import './Menu.scss'
import { useContext, useState } from 'react'


function Menu(props) {

    const { changeCursor } = useContext(MenuContext)


     const menuItems = [
        { name: 'thumbnail carousel', path: '/home/0' },
        { name: 'list-display', path: '/list-display' },
        { name: 'full-screen display', path: '/full-screen-display' },
        // { name: 'rounded gallery', path: '/rounded-gallery' },
        { name: 'grid gallery', path: '/grid-gallery' },
    ]

    return <div className="menu"
      style={
        {
            height: props.menu ? (!props.query ? 'calc(60% + 63px)' : 'calc(200% + 63px)') : '0',
            transitionDelay: props.menu ? '0s' : '0.6s',
        }}>
        <ul   >
            {
                menuItems.map(menuItem => {
                    return <li key={menuItem.name}
                        className='menu-item'

                        onMouseEnter={() => changeCursor(true)}
                        onMouseLeave={() => changeCursor(false)}
                    >
                        <Link to={menuItem.path} onClick={() => {
                            props.onRevealMenu()
                        }}>
                            <div className='menu-title-wrapper'
                                style={{
                                    transform: props.menu ? 'translateY(0)' : 'translateY(35%)',
                                }}>
                                <div className='menu-title'>
                                    {menuItem.name}
                                </div>
                                <div className='menu-title'>
                                    {menuItem.name}
                                </div>
                            </div>
                        </Link>
                    </li>
                })
            }
        </ul>

    </div>
}

export default Menu