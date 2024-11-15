import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './home';
import Music from './music';

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="home" component={Home} />
			<Stack.Screen name="music" component={Music} />
		</Stack.Navigator>		
	)
}

export default App