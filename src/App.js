import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import SearchBar from './SearchBar';
import SongPage from './SongPage';

import './index.css';

function App() {
	return (
		<div className="App">
			<Router>
				<ScrollToTop>
					<Route path="/" exact component={SearchBar} />
					<Route path="/SongPage" exact component={SongPage} />
				</ScrollToTop>
			</Router>
		</div>
	);
}

export default App;
