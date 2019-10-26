import React, { Component } from 'react';
import FrontSide from './FrontSide';
import BackSide from './BackSide';
import AcceptedPayment from './AcceptedPayment';
import withAnimation from './withAnimation';
// Utils
import { addSpace } from '../Utils/utils';
// Animation
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
// Images
import mir from'../imgPaySys/mir.png';
import AmEx from '../imgPaySys/AmEx.png';
import visa from'../imgPaySys/visa.png';
import mastercard from'../imgPaySys/mastercard.png';
import unionPay from'../imgPaySys/UnionPay.png';

const Services = {
	default: "",
	mir: <img src={mir} alt="" width="60" height="20"/>,
	AmEx: <img src={AmEx} alt="" width="130" height="100"/>,
	visa: <img src={visa} alt="" width="60" height="40"/>,
	mastercard: <img src={mastercard} alt="" width="100" height="80"/>,
	unionPay: <img src={unionPay} alt="" width="80" height="60"/>
}

const FrontSideWithAnimationFade = withAnimation(FrontSide, Fade);
const BackSideWithAnimationFlip = withAnimation(BackSide, Flip);
const AcceptedPaymentAnimationZoom = withAnimation(AcceptedPayment, Zoom);

class Card extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			creditNum: "",
			cardholder: "",
			expires: "",
			cvc: "",
			activeSide: "front",
			paymentSuccess: false,
			paymentSystem: Services.default,
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.changeActiveSide = this.changeActiveSide.bind(this);
		this.isAllFieldsFrontFilled = this.isAllFieldsFrontFilled.bind(this);
		this.isCvcFilled = this.isCvcFilled.bind(this);
		this.isWhatPaymentSystem = this.isWhatPaymentSystem.bind(this);
		this.onProceedPayment = this.onProceedPayment.bind(this);
	}

	handleChange(event) {
		let {name, value} = event.target;

		switch (name) {
			case "creditNum":
				value = addSpace(value, 4);
				this.isWhatPaymentSystem();
				break;

			case "expires":
				value = addSpace(value, 2);
				break;

			default:
				break;
		}

		this.setState({
			 [name]: value
		}) 
  	}
  
	changeActiveSide() {
		this.state.activeSide === 'front'
			? this.setState({ activeSide: 'back' })
			: this.setState({ activeSide: 'front' });
	}

	isAllFieldsFrontFilled() {
		if (this.state.creditNum && this.state.cardholder && this.state.expires) {
			return true;
		}
		return false;
	}

	isCvcFilled() {
		if (this.state.cvc.length === 3) {
			return true;
		}
		return false;
	}

	isWhatPaymentSystem() {
		const { creditNum } = this.state;
		switch (creditNum[0]) {
			case "2":
				this.setState({ paymentSystem: Services.mir });
				break;

			case "3":
				this.setState({ paymentSystem: Services.AmEx });
				break;
				
			case "4":
				this.setState({ paymentSystem: Services.visa });
				break;
			
			case "5":
				this.setState({ paymentSystem: Services.mastercard });
				break;
		
			case "6":
					this.setState({ paymentSystem: Services.unionPay });
					break;	

			default:
				this.setState({ paymentSystem: Services.default });
				break;
		}
	}

	onProceedPayment() {
		this.setState({ paymentSuccess: true, activeSide: "payment-success" });
	}

	render() {
		const {
			creditNum,
			cardholder,
			expires,
			cvc,
			paymentSystem,
			activeSide,
			paymentSuccess
		} = this.state;

		let ViewSide;

		if (activeSide === 'front' && !paymentSuccess) {
			ViewSide = 
				<FrontSideWithAnimationFade
					duration={1000}
					left
					creditNum={creditNum}
					expires={expires}
					cardholder={cardholder}
					paymentSystem={paymentSystem}
					isAllFieldsFrontFilled={this.isAllFieldsFrontFilled}
					changeActiveSide={this.changeActiveSide}
					onChange={this.handleChange}
				/>
		} else if (activeSide === 'back' && !paymentSuccess) {
			ViewSide =
				<BackSideWithAnimationFlip
					left
					cvc={cvc}
					isCvcFilled={this.isCvcFilled}
					onChange={this.handleChange}
					changeActiveSide={this.changeActiveSide}
					onProceedPayment={this.onProceedPayment}
				/>
		} else {
			ViewSide = <AcceptedPaymentAnimationZoom duration={1000} top/>
		}

		return ViewSide;
	}
}

export default Card;