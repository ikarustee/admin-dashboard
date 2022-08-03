import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({children}) => { 
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [themeSettings, setThemeSettings] = useState(false);
    
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value); // update local storage to remember what the user chose the last time
        setThemeSettings(false);
    };
    
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
    };

    // "clicked" as parameter we get the information which element has been clicked
    const handleClick = (clicked) => {
        // setIsClicked(clicked) doesn't work because isClicked is an object. And we can not overwrite an object with a string
        // because setIsClicked (property) is an object we need to open up the object, spread the initial state 
        // and then inside of [] only change the value of what has been clicked 
        // ...initialState where everything is false
        setIsClicked({...initialState, [clicked]: true });
    }

    return (
      <StateContext.Provider
        value={{
          currentColor,
          currentMode,
          activeMenu,
          screenSize,
          setScreenSize,
          handleClick,
          isClicked,
          initialState,
          setIsClicked,
          setActiveMenu,
          setMode,
          setColor,
          themeSettings,
          setThemeSettings
        }}
      >
        {children}
      </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);