import React from 'react';

const Input = ({ className, name, id, value, pattern, placeholder, width, maxLenght, onKeyPress, onChange, children }) => (
	<div className={className}>
		<label htmlFor={id} className="card__label">
			{children}
		</label>
		<input 
			className="card__input"
			name={name}
			value={value}
			id={id}
			type="text"
			pattern={pattern}
			placeholder={placeholder}
			maxLength={maxLenght}
			onKeyPress={onKeyPress}
			onChange={onChange}
			style={{width: width+"px" }}
			required
		/>
	</div>
)

export default Input;