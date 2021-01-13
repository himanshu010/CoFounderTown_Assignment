import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddBlog.css';
const token = localStorage.usertoken;

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
			topic: null,
			description: null,
			formErrors: {
				topic: '',
				description: '',
			},
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		//console.log(this.state);
		if (formValid(this.state)) {
			const authAxios = axios.create({
				baseURL: 'http://localhost:5000/api/',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		
			authAxios
				.post('/addBlog',this.state)
				.then((res) => {
					console.log(res);
					alert(res.data.status);
					this.props.history.push('/');
				})
				.catch((err) => {
					alert("error: 'Report can't be added!'");
					console.log(err);
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
					<h1>Add Your Report</h1>
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="topic">
							<label htmlFor="topic">Topic</label>
							<input
								className={formErrors.topic.length > 0 ? 'error' : null}
								placeholder="topic"
								type="text"
								name="topic"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.topic.length > 0 && <span className="errorMessage">{formErrors.topic}</span>}
						</div>
						<div className="description">
							<label htmlFor="description">description</label>
							<input
								className={formErrors.description.length > 0 ? 'error' : null}
								placeholder="description"
								type="text"
								name="description"
								noValidate
								onChange={this.handleChange}
							/>
							{formErrors.description.length > 0 && <span className="errorMessage">{formErrors.description}</span>}
						</div>

						<div className="createAccount">
							<button type="submit">Create Blog</button>
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
