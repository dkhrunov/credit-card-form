import React from 'react';

const Button = ({ className, type, onClick, children }) => (
	<button className={className} type={type} onClick={onClick}>
		{children}
	</button>
);

export default Button;