import * as React from 'react';
import { useState } from 'react';

import Home from './pages/home';
import Music from './pages/music';
import History from './pages/history'
import Settings from './pages/settings'

import { SettingList } from './context/setting-data.jsx';

import Footer from './footer';
import Header from './header';

const App = () => {
	const [currentPage, setCurrentPage] = useState("home")

	return (
		<SettingList>
			<Header />
			{currentPage == "home" ? <Home setCurrentPage={setCurrentPage} /> : null}
			{currentPage == "music" ? <Music /> : null}
			{currentPage == "history" ? <History /> : null}
			{currentPage == "settings" ? <Settings /> : null}
			<Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</SettingList>
	)
}

export default App