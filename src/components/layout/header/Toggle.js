import { useContext } from 'react'
import './Toggle.scss'
import { Row } from '../../containers/containers'
import { MenuContext } from '../../../provider/MenuProvider'

function Toggle(props) {

    const { changeCursor } = useContext(MenuContext)

    return <Row
        style={{ pointerEvents: 'auto' }}
        onMouseEnter={() => changeCursor(true)}
        onMouseLeave={() => changeCursor(false)}
        onMouseMove={() => changeCursor(true)}>
        <div className='title'>Menu</div>
        <div className='toggle'
            onClick={() => {
                props.onRevealMenu()
            }}>
            <div className='toggle-line'
                style={{
                    transform: props.menu ? 'rotate(45deg)' : null,
                    margin: props.menu ? '0' : ' 3px 0'
                }}>
            </div>
            <div className='toggle-line'
                style={{
                    transform: props.menu ? 'rotate(-45deg)' : null,
                    margin: props.menu ? '-1px' : ' 3px 0'
                }}>
            </div>

        </div>
    </Row>
}

export default Toggle