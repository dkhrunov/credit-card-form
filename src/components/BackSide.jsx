import React from 'react';
import Input from './Input';
import Button from './Button';
import withAnimation from './withAnimation';
// Utils
import { isNumberKey } from '../Utils/utils';
// Animation
import Fade from 'react-reveal/Fade';

const ButtonWithAnimationFade = withAnimation(Button, Fade);

const BackSide = ({ cvc, isCvcFilled, onChange, changeActiveSide, onProceedPayment }) => (
	<div className="row" >
		<div className="card-btn__back">
			<Button
				className="card-btn back-btn"
				type="button"
				onClick={changeActiveSide}
			>
				Back
			</Button>
		</div>
		<div className="card-back">
			<div className="card-back__magnetic-strip"></div>
			<div className="card-back__cvc">
					<div className="row" style={{ justifyContent: "flex-end" }}>
						<Input
							className="card__cvc"
							name="cvc"
							id="cvc"
							value={cvc}
							width="50"
							maxLenght={3}
							onChange={onChange}
							onKeyPress={isNumberKey}
						>
							CVC
						</Input>
					</div>
			</div>
		</div>
		<div className="card-btn__approval">
			<ButtonWithAnimationFade
				when={isCvcFilled()}
				left
				className="card-btn approval-btn"
				type="button"
				onClick={onProceedPayment}
			>
				Proceed payment
			</ButtonWithAnimationFade>
		</div>
	</div>
)

export default BackSide;