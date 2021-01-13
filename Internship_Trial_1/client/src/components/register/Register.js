import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const formValid = ({ formErrors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(formErrors).forEach((val) => {
		val.length > 0 && (valid = false);
	});

	// validate the form was filled out
	Object.values(rest).forEach((val) => {
		val === null && (valid = false);
	});

	return valid;
};

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			username: null,
			age: null,
			password: null,
			formErrors: {
				name: '',
				email: '',
				username: '',
				age: '',
				password: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (formValid(this.state)) {
			this.setState(() => {
				axios
					.post('http://localhost:5000/api/register', this.state)
					.then((res) => {
						var rep = `${this.state.email}`;
						var st = rep + ' registered';
						console.log(res.data);
						if (res.data.status === st) {
							this.props.history.push('/login');
						} else {
							alert("error: 'User already exists!'");
						}
					})
					.catch((err) => {
						alert("error: 'User already exists!!!!!!!'");
						console.log(err);
					});
			});
		} else {
			console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
		}
	};

	handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		let formErrors = { ...this.state.formErrors };

		switch (name) {
			case 'name':
				formErrors.name = value.length < 3 ? 'minimum 3 characaters required' : '';
				break;
			case 'email':
				formErrors.email = value.length < 3 ? 'minimum 3 characaters required' : '';
				break;
			case 'username':
				formErrors.username = value.length < 3 ? 'minimum 3 characaters required' : '';
				break;
			case 'age':
				formErrors.age = value.length > 3 ? 'maximum 3 characaters required' : '';
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
					<h1>Create Account</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="name">
							<label htmlFor="name">Name</label>
							<input
								className={formErrors.name.length > 0 ? 'error' : null}
								placeholder="name"
								type="text"
								name="name"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.name.length > 0 && <span className="errorMessage">{formErrors.name}</span>}
						</div>
						<div className="email">
							<label htmlFor="email">Email</label>
							<input
								className={formErrors.email.length > 0 ? 'error' : null}
								placeholder="email"
								type="text"
								name="email"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.email.length > 0 && <span className="errorMessage">{formErrors.email}</span>}
						</div>
						<div className="username">
							<label htmlFor="username">User Name</label>
							<input
								className={formErrors.username.length > 0 ? 'error' : null}
								placeholder="username"
								type="text"
								name="username"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.username.length > 0 && (
								<span className="errorMessage">{formErrors.number}</span>
							)}
						</div>
						<div className="age">
							<label htmlFor="age">Age</label>
							<input
								className={formErrors.age.length > 0 ? 'error' : null}
								placeholder="age"
								type="text"
								name="age"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.age.length > 0 && <span className="errorMessage">{formErrors.age}</span>}
						</div>
						<div className="password">
							<label htmlFor="password">Password</label>
							<input
								className={formErrors.password.length > 0 ? 'error' : null}
								placeholder="Password"
								type="password"
								name="password"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.password.length > 0 && (
								<span className="errorMessage">{formErrors.password}</span>
							)}
						</div>

						<div className="createAccount">
							<button type="submit">Create Account</button>
							<Link to={'/login'}>
								<small>Already Have an Account?</small>
							</Link>
							<Link to={'/'}>
								<small>Cancel</small>
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default RegisterPage;
