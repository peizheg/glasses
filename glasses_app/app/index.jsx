import * as React from 'react';
import { useState } from 'react';

import Home from './pages/home';
import Music from './pages/music';
import History from './pages/history'
import Settings from './pages/settings'

import Footer from './footer';
import Header from './header';

const App = () => {
	const [currentPage, setCurrentPage] = useState("home")
	const [song, setSong] = useState({})

	return (
		<>
			<Header />
			{currentPage == "home" ? <Home setCurrentPage={setCurrentPage} song={song} setSong={setSong} /> : null}
			{currentPage == "music" ? <Music song={song} setSong={setSong} /> : null}
			{currentPage == "history" ? <History /> : null}
			{currentPage == "settings" ? <Settings /> : null}
			<Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>	
	)
}

export default App