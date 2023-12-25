import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

const MenuProvider = (props) => {

    const [cursorStyle, setCursorStyle] = useState(false)
    const [isLoading, setIsLoading] = useState(0)
    const [allowNext, setAllowNext] = useState(false)
 

    const importAll = (r) => {
        return r.keys().map(r);
    };

    const images = importAll(require.context('../assets', false, /\.(webp)$/));


    function updateLoading(newVale) {
        setIsLoading(newVale)
    }

    function changeCursor(newVale) {
        setCursorStyle(newVale)

    }

    function updateAllowNext(newVale) {
        setAllowNext(newVale)
    }
 

    return (
        <MenuContext.Provider value={{
            changeCursor,
            cursorStyle,
            isLoading,
            updateLoading,
            images,
            updateAllowNext,
            allowNext,
 
        }}>
            {props.children}
        </MenuContext.Provider>
    );
};

export default MenuProvider;
