import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/Profile';

import Blog from './components/blogs/BlogDisplay';
import addBlog from './components/blogs/AddBlog';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/user" component={Profile} />
					</div>
					<Route exact path="/blog" component={Blog} />
					<Route exact path="/addBlog" component={addBlog} />
				</div>
			</Router>
		);
	}
}

export default App;
