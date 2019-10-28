import React from 'react';
import './Home.scss';
import '../../assets/img/ok.jpg';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import laptop from '../../assets/img/macbookpro13_front.png';

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
