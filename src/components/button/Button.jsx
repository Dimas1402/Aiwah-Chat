import React from 'react';

const Button = ({ type, className, onClick, textButton }) => {
	return (
		<button type={type} className={className} onClick={onClick}>
			{textButton}
		</button>
	);
};

export default Button;
