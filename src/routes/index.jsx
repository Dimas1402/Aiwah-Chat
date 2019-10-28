import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Register, About, Error, Login, Chat } from '../components';

class Routes extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' component={Login} />
						<Route path='/register' component={Register} />
						<Route path='/about' component={About} />
						<Route path='/chat' component={Chat} />
						<Route component={Error} />
					</Switch>
				</Router>
			</div>
		);
	}
}
export default Routes;
