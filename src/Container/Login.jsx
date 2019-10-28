import React from 'react';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/header/Header';

let brand = require('../assets/img/a.svg');

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			password: '',
			// usernameErr:"",
			passwordErr: '',
			token: '',
			user: '',
		};
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	validate = () => {
		const { passwordErr } = this.state;
		if (!this.state.passwordErr) {
			this.setState({ passwordErr: 'Username or Password wrong.' });
		}

		if (passwordErr) {
			this.setState({ passwordErr: passwordErr });
			return false;
		}
		return true;
	};
	signIn = (i) => {
		i.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
		}
		const dataInput = {
			name: this.state.name,
			password: this.state.password,
		};
		this.setState({
			isLoading: true,
		});

		Axios.post('https://aqueous-hollows-28311.herokuapp.com/login', dataInput)
			.then((res) => {
				console.log('dataUsernya', res.data.login);
				localStorage.setItem('token', res.data.access_token);
				localStorage.setItem('user', JSON.stringify(res.data.login));
				this.setState({
					// token: res.data.access_token,
					// user:res.data.user,
					isLoading: false,
				});
			})
			.catch((err) => {
				this.setState({
					isLoading: false,
				});
				alert('gagal login');
			});
	};

	render() {
		const { isLoading } = this.state;
		if (localStorage.getItem('token', 'user')) {
			return <Redirect to='/chat' />;
		} else if (isLoading) {
			return (
				<div id='preloader'>
					<div id='loader'></div>
				</div>
			);
		}
		return (
			<div id='container' className='container-fluid'>
				<Header />
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<div className='login-form'>
								<img src={brand} alt='' />
								<div className='login-section'>
									<form onSubmit={this.signIn} logOut={this.signOut}>
										<div style={{ fontSize: 15, color: 'red', marginLeft: 35 }}>
											{this.state.passwordErr}
										</div>
										<input
											type='text'
											name='name'
											placeholder=' Username'
											value={this.state.name}
											onChange={this.handleChange}
											autoComplete='off'
											required
										/>
										<input
											type='password'
											name='password'
											placeholder='Password'
											value={this.state.password}
											onChange={this.handleChange}
											autoComplete='off'
											required
										/>
										<button type='submit' className='btn btn-outline-primary'>
											Login
										</button>
										<br />
										<div className='reg'>
											<span>
												belum <Link to='/register'>daftar?</Link>
											</span>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
