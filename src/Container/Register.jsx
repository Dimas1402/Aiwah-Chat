import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import Header from '../components/header/Header';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			password: '',
			email: '',
			telp: '',
			nameErr: '',
			emailErr: '',
			err: '',
			// avatar:"",
			registered: false,
		};
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	validate = () => {
		const { nameErr } = this.state;
		const { emailErr } = this.state;

		if (!this.state.nameErr) {
			this.setState({ nameErr: 'username telah digunakan' });
		}
		if (!this.state.emailErr) {
			this.setState({ emailErr: 'email telah digunakan' });
		}
		if ((nameErr, emailErr)) {
			this.setState({ nameErr: nameErr, emailErr: emailErr });
			return false;
		}
		return true;
	};
	handleSave = (e) => {
		e.preventDefault();
		const isValid = this.validate();
		if (isValid) {
			console.log(this.state);
		}
		const regis = {
			name: this.state.name,
			password: this.state.password,
			email: this.state.email,
			telp: this.state.telp,
			// avatar: this.state.avatar
		};
		this.setState({
			isLoading: true,
		});

		Axios.post(
			'https://aqueous-hollows-28311.herokuapp.com/register',
			regis,
		).then((res) => {
			this.setState({
				name: '',
				password: '',
				email: '',
				telp: '',
				// avatar:"",
				isLoading: false,
				registered: true,
			});
			if (res.data.status === 400) {
				alert('username atau email telah terpakai');
			} else {
				alert('data tersimpan');
				console.log(res);
				return <Redirect to='/login' />;
			}
		});
	};
	render() {
		const { registered, isLoading } = this.state;

		if (registered) {
			return <Redirect to='/login' />;
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
						<div className='col-sm'>
							<div className='register-form '>
								<div className='register-section'>
									<form onSubmit={this.handleSave}>
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
										<div style={{ fontSize: 12, color: 'red' }}>
											{this.state.nameErr}
										</div>
										<input
											placeholder=' Email'
											type='email'
											name='email'
											value={this.state.email}
											onChange={this.handleChange}
											autoComplete='off'
											required
										/>
										<div style={{ fontSize: 12, color: 'red' }}>
											{this.state.emailErr}
										</div>
										<input
											type='password'
											name='password'
											placeholder=' Password'
											value={this.state.password}
											onChange={this.handleChange}
											autoComplete='off'
											required
										/>
										<input
											placeholder=' Nomor Telepon'
											type='number'
											name='telp'
											value={this.state.telp}
											onChange={this.handleChange}
											autoComplete='off'
											required
										/>
										<button
											type='submit'
											className='btn btn-outline-primary'
											id='tombol'>
											Sign Up
										</button>
										<br />
										<div className='reg'>
											<span>
												sudah punya akun? <Link to='/login'>masuk.</Link>
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

export default Register;
