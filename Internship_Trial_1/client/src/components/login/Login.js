import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';


const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach((val) => {
		if (val === '') {
			valid = false;
		}
	});

	// validate the form was filled out
	Object.values(rest).forEach((val) => {
		if (val !== null) {
			valid = true;
		}
	});
	console.log(valid);
	return valid;
};

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loggedIn: null,
			formErrors: {
				email: '',
				password: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();

		if (formValid(this.state)) {
			this.setState(() => {
				axios
					.post('http://localhost:5000/api/login', this.state)
					.then((res) => {
						if (res.data.status === 'user logged in') {
							localStorage.setItem('usertoken', res.data.token);
							console.log(res.data.token);
							this.props.history.push('/user');
						} else {
							alert("error: 'User does not exist with this number or password!'");
						}
					})
					.catch((err) => {
						console.log(err);
					});
			});
		}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };
		switch (name) {
			case 'email':
				formErrors.email = value.length < 10 ? 'minimum 01 characaters required' : '';
				break;
			case 'password':
				formErrors.password = value.length < 6 ? 'minimum 6 characaters required' : '';
				break;
			default:
				break;
		}

		this.setState({ formErrors, [name]: value }, () => console.log(this.state));
	};

	render() {
		const { formErrors } = this.state;
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Login</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								className={formErrors.email.length > 0 ? 'error' : null}
								placeholder="Email"
								type="text"
								name="email"
								noValidate
								value={this.state.email}
								onChange={this.handleChange}
							/>
							{formErrors.email.length > 0 && <span className="errorMessage">{formErrors.email}</span>}
						</div>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								className={formErrors.password.length > 0 ? 'error' : null}
								placeholder="Password"
								type="password"
								name="password"
								noValidate
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<Link to={'/forgotPassword'}>
								<small style={{ fontWeight: 'bolder' }}>Forgot Password ?</small>
							</Link>
							{formErrors.password.length > 0 && (
								<span className="errorMessage">{formErrors.password}</span>
							)}
						</div>

						<div className="createAccount">
							<button type="submit">Login</button>
							<Link to={'/register'}>
								<small style={{ fontWeight: 'bolder' }}>Create an Account</small>
							</Link>
							<Link to={'/'}>
								<small style={{ fontWeight: 'bolder' }}>Cancel</small>
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default LoginPage;
