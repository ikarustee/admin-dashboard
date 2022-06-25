import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setscreenSize] = useState(undefined);

    const handleClick = (clicked) => {
        // because setIsClicked (property) is an object we need to open up the object, spread the initial state 
        // and then inside of [] only change the value of what has been clicked 
        setIsClicked({...initialState, [clicked]: true });
    }

    return (
        <StateContext.Provider
            value={{
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize, 
                setscreenSize
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);