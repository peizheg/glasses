import * as React from 'react';
import { useState } from 'react';

import Home from './home';
import Music from './music';

const App = () => {
	const [currentPage, setCurrentPage] = useState("home")

	return (
		<>
			{currentPage == "home" ? <Home setCurrentPage={setCurrentPage} /> : null}
			{currentPage == "music" ? <Music setCurrentPage={setCurrentPage} /> : null}
		</>	
	)
}

export default App