import './Error.scss';
import { MenuContext } from '../../provider/MenuProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../page-transition/PageTransition';

function ErrorPage() {
    const { changeCursor } = useContext(MenuContext);
    const navigate = useNavigate();

    return (
        <PageTransition className='error'>
            <div className='error-text'>
                {`[The page you are looking for might be in another castle.]`}
                <div
                    className='navigate-from-error'
                    onMouseEnter={() => changeCursor(true)}
                    onMouseLeave={() => changeCursor(false)}
                    onClick={() => {
                         navigate('/home/0');
                    }}
                >
                    go to main.
                </div>
            </div>
        </PageTransition>
    );
}

export default ErrorPage;
