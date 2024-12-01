import React, { useReducer, useContext } from 'react';

const Settings = React.createContext();

export const SettingList = ({ children }) => {
	const defaults = {
		refresh: 10,
		scrollRate: 5,
        textSize: 5,
		orientation: false,
        lowPow: false,
        lowData: false,
	};
	
	const listReducer = (state, action) => {
		switch (action.type) {
			case 'changeSetting':
				state[action.payload.name] = action.payload.newValue;
				return state;
			case 'reset':
                //Object.keys(defaults).forEach((key) => {state[key] = defaults[key];});
				return { ...defaults };
			case 'totalRewrite':
				return action.payload;
			default:
				console.log("no action passed to Settings");
				return state;
		}
	};
	
	const [settings, dispatch] = useReducer(listReducer, defaults);
	
	const changeSetting = ( setting, newValue ) => {
		dispatch({type: "changeSetting", payload: {setting, newValue}});
	};
    const resetSettings = () => {
		dispatch({type: "reset"});
	};
	const setSettings = ( settings ) => {
		dispatch({type: "totalRewrite", payload: settings});
	};
	
	return <Settings.Provider value={{settings, changeSetting, resetSettings, setSettings}}>{children}</Settings.Provider>;
};

export default Settings;