import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import MenuIcon from './components/layout/MenuIcon';
import Sidenav from './components/layout/Sidenav';
import Home from './components/layout/Home';
import Weather from './components/weather/Weather';


function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="container">
					<MenuIcon />
					<Sidenav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/:woeid" component={Weather} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
