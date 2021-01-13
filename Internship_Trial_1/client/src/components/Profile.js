import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
class Profile extends Component {
	constructor() {
		super();
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
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
				.get('http://localhost:5000/api/user/' + decoded.id)
				.then((response) => {
					console.log(response.data[0]);
					this.setState({
						name: response.data[0].name,
						email: response.data[0].email,
						username: response.data[0].username,
						age: response.data[0].age,
					});
				})
				.catch((error) => console.log(error));
		});
		
	}

	render() {
		return (
			<div className="container">
				<div className="jumbotron mt-5">
					<div className="col-sm-8 mx-auto">
						<h1 className="text-center">PROFILE</h1>
					</div>
					<table className="table col-md-6 mx-auto">
						<tbody>
							<tr>
								<td>Name</td>
								<td>{this.state.name}</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>{this.state.email}</td>
							</tr>
							<tr>
								<td>User Name</td>
								<td>{this.state.username}</td>
							</tr>
							<tr>
								<td>Age</td>
								<td>{this.state.age}</td>
							</tr>
						</tbody>
					</table>

				</div>
			</div>
		);
	}
}

export default Profile;
