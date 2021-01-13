import React, { Component } from 'react';
import axios from 'axios';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			MyBlogs: [],
			showComments: false,
		};
	}
	componentDidMount() {
		const token = localStorage.usertoken;
		console.log(token);

		this.setState(() => {
			axios
				.get('http://localhost:5000/api/blogs')
				.then((response) => {
					console.log(response.data);
					this.setState({ MyBlogs: response.data.reverse() });
				})
				.catch((error) => console.log(error));
		});
	}
	render() {
		const { MyBlogs } = this.state;
		return MyBlogs.map((blog) => {
			return (
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{blog.topic}</h5>
						<h6 className="card-subtitle mb-2 text-muted">{blog.created}</h6>
						<p className="card-text">{blog.description}</p>
					</div>
				</div>
			);
		});
	}
}

export default Landing;
