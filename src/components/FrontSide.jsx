import React from 'react';
import Input from './Input';
import Button from './Button';
import withAnimation from './withAnimation';
// Utils
import { isNumberKey } from '../Utils/utils';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
// Animation
import Zoom from 'react-reveal/Zoom';
// Images
import logo from'../logo.png';

const ButtonWithAnimationZoom = withAnimation(Button, Zoom);

const FrontSide = ({ creditNum, expires, cardholder, isAllFieldsFrontFilled, paymentSystem, changeActiveSide, onChange}) => (
	<div className="card">
		<div className="card__logo">
			<img src={logo} alt="" width="120" height="100"/>
			<Zoom when={paymentSystem}>
				{paymentSystem}
			</Zoom>
		</div>
		<div className="card__info">
			<div className="row">
				<Input
					className="card__number"
					name="creditNum"
					id="number"
					value={creditNum}
					pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
					placeholder="4456 5577 6444 5678"
					maxLenght={19}
					onKeyPress={isNumberKey}
					onChange={onChange}
				>
					Credit card number
				</Input>
				<Input
					className="card__expires"
					name="expires"
					id="expires"
					value={expires}
					pattern="\d{2}\s\d{2}"
					placeholder="MM YY"
					width="85"
					maxLenght={5}
					onKeyPress={isNumberKey}
					onChange={onChange}					
				>
					Expires
				</Input>
			</div>
			<div className="row">
				<Input
					className="card__cardholder"
					name="cardholder"
					id="cardholder"
					value={cardholder}
					placeholder="IVAN PETROV"
					onChange={onChange}
				>
					Cardholder name
				</Input>
				<div className="card__change-side">
					<ButtonWithAnimationZoom
						when={isAllFieldsFrontFilled()}
						duration={500}
						className="cvc-btn"
						type="submit"
						onClick={changeActiveSide}
					>
						CVC 
						<FontAwesomeIcon icon={faSync} />
					</ButtonWithAnimationZoom>
				</div>
			</div>
		</div>
	</div>
)

export default FrontSide;