import React from 'react';
import './About.scss';
import Header from '../header/Header';

const About = () => {
	return (
		<div className='about'>
			<Header />
			<div className='container'>
				<div className='row'>
					<div className='col text-center'>
						<div className='intro'>
							<div className='teks'>
								<h1>Aiwah</h1>
								<p>by Alpha Team.</p>
								<span>
									Aiwah adalah aplikasi berpesan dan memanggil yang dibuat untuk
									memudahkan kamu berkomunikasi dengan teman mu dimana saja dan
									kapan saja.
									<br />
								</span>
								<br />
							</div>
							<br />
							<div className='row'>
								<div className='col'>
									<h1>meet our team</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default About;
