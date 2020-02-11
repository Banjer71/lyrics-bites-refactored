import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import SongPage from './SongPage';
import './index.css';

function App() {
	return (
		<div className="App">
			<h1>Lyrics Bites</h1>
			<h3>Learn your favourite song one bite at a time</h3>
			<Router>
				<Route path="/" exact component={SearchBar} />
				<Route path="/SongPage" exact component={SongPage} />
			</Router>
		</div>
	);
}

export default App;
