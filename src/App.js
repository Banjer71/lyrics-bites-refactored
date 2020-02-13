import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import SongPage from './SongPage';

import './index.css';

function App( props ) {
	return (
		<div className="App">
			
			<Router>
				<Route path="/" exact component={SearchBar} />
				<Route path="/SongPage" exact component={SongPage} />
				
			
			</Router>
		</div>
	);
}

export default App;
