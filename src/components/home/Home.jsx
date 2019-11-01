import React from 'react';
import './Home.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Home = () => {
	return (
		<>
			<div className='home'>
				<Header />
				<div className='container'>
					<div className='row'>
						<div className='col'>
							<div className='intro'>
								<span>
									<span className='ez'>easiest</span> way to talk with your
									friends.
								</span>
							</div>
							<div className='sub'>
								<span>
									sebuah mini project untuk masing masing tim santri pondok
									programmer yang harus diselesaikan dalam jangka waktu 1 bulan.
								</span>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Home;
