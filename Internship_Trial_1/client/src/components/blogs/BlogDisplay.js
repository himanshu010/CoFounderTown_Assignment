import React, { Component } from 'react';
import './BlogDisplay.css';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const token = localStorage.usertoken;

class BlogDisplay extends Component {
	constructor(props) {
		super(props);

		this.state = {
			MyBlogs: [],
			showComments: false,
			name: token !== '' ? jwt_decode(token).username : 'Anonomous User',
		};
	}

	componentDidMount() {
		const token = localStorage.usertoken;
		console.log(token);

		this.setState(() => {
			if (token === '') {
				alert('User not logged-in, Please Login First!');
				this.props.history.push('/');
			}
			const decoded = jwt_decode(token);
			console.log(decoded.id);
			axios
				.get('http://localhost:5000/api/blogs/' + decoded.id)
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
				<div className="card" >
					<div className="card-body">
						<h5 className="card-title">{blog.uploadname}</h5>
						<h6 className="card-subtitle mb-2 text-muted">{blog.created}</h6>
						<p className="card-text">
							{blog.description}
						</p>
					</div>
				</div>
			);
		});
	}
}

export default BlogDisplay;
