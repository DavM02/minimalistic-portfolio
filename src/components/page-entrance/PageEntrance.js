import React from "react";
import ReactDOM from "react-dom";
import './PageEntrance.scss'
import { useEffect, useState, useContext } from "react";
 import { MenuContext } from "../../provider/MenuProvider";
function PageEntrance() {

    const [inset, setInset] = useState(false)
    const {updateLoading, isLoading}  = useContext(MenuContext)
    const [isLoaded, setIsLoaded] = useState(0)
    const [removeEl, setRemoveEl] = useState(false)

    const Arr = Array.from({ length: 25 }, (_, index) => index);

    const totalHeight = Arr.reduce((sum, el) => sum + el, 0);

    useEffect(() => {
        let intervalId 
            intervalId = setInterval(() => {
                if (isLoading >= 100) {
                    updateLoading(100);
                    setInset(true)
                    clearInterval(intervalId);
                } else {
                    updateLoading(prevState => {
                        const newValue = prevState + Math.floor(Math.random() * 10);
                        return newValue > 100 ? 100 : newValue;
                    });
                }
            }, 110);
   

        return () => clearInterval(intervalId);

    }, [isLoading]);

    useEffect(() => {
        if (Arr.length * 2 === isLoaded) {
            setRemoveEl(true)
        }
    }, [isLoaded])

    const renderElement = (
        !removeEl && < div className={`page-loader ${!removeEl ? 'waiting' : null}`} >
            <div className="loader-container">
                {Arr.map((el, i) => (
                    <div
                        onTransitionEnd={() => setIsLoaded(prevState => prevState + 1)}
                        key={i}
                        style={{
                            backgroundColor: inset ? 'rgb(242, 242, 242) ' : 'rgba(15, 15, 15)',
                            height: `${(el / totalHeight) * 100 + 1}%`,
                            clipPath: inset ? 'inset(0  0 100% 0)' : 'inset(0 0 0 0)'
                        }}
                        className="loader-item"
                    ></div>
                ))}


                <div style={{opacity: !inset ? '1' : '0'}} className="loader-box">
                    <div className="loader-bar"
                        style={{
                            clipPath: !inset ? `inset(0 ${100 - isLoading}% 0 0` : 'inset(0 0 0 0)'
                        }}
                        >
                    </div>
                    <div className="border border-1"></div>
                    <div className="border border-2"></div>
                    <div className="border border-3"></div>
                    <div className="border border-4"></div>
                    <div className="loader-title">{`[Loading...]`}</div>
                </div>
                
            </div>
        </div >
    )

    return ReactDOM.createPortal(
        renderElement,
        document.getElementById("loader-root")
    );
}

export default PageEntrance;
