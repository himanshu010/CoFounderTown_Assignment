const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Blog = require('../models/Blog');
users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/register', (req, res) => {
	const today = new Date();
	const userData = {
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		age: req.body.age,
		password: req.body.password,
		createdby: today,
	};
	if (!req.body.email || !req.body.password) {
		res.end('email or password is not present');
	}
	User.findOne({
		email: req.body.email,
	})
		.then((user) => {
			if (!user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					userData.password = hash;
					User.create(userData)
						.then((user) => {
							res.json({ status: user.email + ' registered' });
						})
						.catch((err) => {
							res.send('error: ' + err);
						});
				});
			} else {
				res.json({ error: 'User already exists' });
			}
		})
		.catch((err) => {
			res.send('error: ' + err);
		});
});

users.post('/login', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		res.end('email or password is not present');
	}

	User.findOne({
		email: email,
	})
		.then((user) => {
			if (user.email != '') {
				let ans = bcrypt.compareSync(password, user.password);
				if (ans) {
					let token = jwt.sign({ id: user._id }, 'another password', { expiresIn: '10d' });
					res.json({ status: 'user logged in', token });
					//res.send(token);
				}
			} else {
				res.status(400).json({ error: 'User does not exist' });
			}
		})
		.catch((err) => {
			res.status(400).json({ error: 'Either username or password is wrong or user not exist' });
		});
});

users.get('/user/:id', (req, res) => {
	let id = req.params['id'];
	User.find({_id:id}, function (err, result) {
		if (err) {
			res.json(err);
		} else {
			res.send(result);
		}
	});
	
});

users.post('/addBlog', (req, res) => {
	const authHeader = req.headers['authorization'];
	console.log(authHeader);
	let token;
	if (authHeader) {
		token = req.headers.authorization.split(' ')[1];
		if (token == null) {
			res.end('Oops you cant create this request!');
		}
	} else {
		res.end('User is not logged in ');
	}
	console.log(token);
	try {
		let decoded = jwtDecode(token);
		//const user2 = User.findById(decoded.id);
		//console.log(user2.schema.obj.username);
		const Today = new Date();
		const Data = {
			topic: req.body.topic,
			description: req.body.description,
			logID: decoded.id,
			created: Today,
		};

		Blog.create(Data)
			.then((blog) => {
				res.json({ status: ' Report submitted successfully ', blog });
			})
			.catch((err) => {
				res.send('error: ' + err);
			});
	} catch (err) {
		return res.end('User is not authenticated');
	}
});

users.get('/blogs', (req, res) => {
	Blog.find({}, function (err, docs) {
		if (err) res.json(err);
		else res.send(docs);
	});
});

users.get('/blogs/:logID', (req, res) => {
	let id = req.params['logID'];
	Blog.find({logID:id}, function (err, result) {
		if (err) {
			res.json(err);
		} else {
			res.send(result);
		}
	});
});

module.exports = users;
