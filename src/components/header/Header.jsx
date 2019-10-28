import React from 'react';
import './Header.scss';
import Brand from '../../assets/img/a.svg';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<div>
			<div className='header'>
				<nav className='navbar navbar-expand-sm navbar-light'>
					<Link className='navbar-brand' to='/'>
						<img src={Brand} alt='' />
					</Link>
					<div className='brand'>
						<h1>AIWAH</h1>
					</div>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<ul className='navbar-nav ml-auto'>
							{/* <li className='nav-item'>
								<Link className='nav-link' to='/about'>
									About
								</Link>
							</li> */}
							<li className='nav-item'>
								<Link className='nav-link' to='/login'>
									Log In
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/register'>
									Sign Up
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</div>
	);
}
export default Header;
