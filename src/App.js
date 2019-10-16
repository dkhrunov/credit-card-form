import React, { Component } from 'react';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
// Styles
import './App.css';
// Animation
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
// Images
import logo from'./logo.png';
import mir from'./mir.png';
import AmEx from './AmEx.png';
import visa from'./visa.png';
import mastercard from'./mastercard.png';
import unionPay from'./UnionPay.png';


const Services = {
	default: "",
	mir: <img src={mir} alt="" width="60" height="20"/>,
	AmEx: <img src={AmEx} alt="" width="130" height="100"/>,
	visa: <img src={visa} alt="" width="60" height="40"/>,
	mastercard: <img src={mastercard} alt="" width="100" height="80"/>,
	unionPay: <img src={unionPay} alt="" width="80" height="60"/>
}

const Input = ({ className,
					id,
					value,
					pattern,
					placeholder,
					width,
					onChange,
					children }) =>
	<div className={className}>
		<label htmlFor={id} className="card__label">
			{children}
		</label>
		<input 
			className="card__input"
			value={value}
			id={id}
			type="text"
			pattern={pattern}
			placeholder={placeholder}
			style={{width: width+"px" }}
			onChange={onChange}
			required
		/>
	</div>

const Button = ({ className, type, onClick, children }) =>
	<button className={className} type={type} onClick={onClick}>
		{children}
	</button>

const FrontSide = ({ creditNum,
							expires,
							cardholder,
							isAllFieldsFrontFilled,
							paymentSystem,
							changeActiveSide,
							onChangeCardNum,
							onChangeExpires,
							onChangeCardholder }) =>
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
					id="number"
					value={creditNum}
					pattern="\d{4}\s\d{4}\s\d{4}\s\d{4}"
					placeholder="4456 5577 6444 5678"
					onChange={onChangeCardNum}
				>
					Credit card number
				</Input>
				<Input
					className="card__expires"
					id="expires"
					value={expires}
					pattern="\d{2}\s\d{2}"
					placeholder="MM YY"
					width="85"
					onChange={onChangeExpires}
				>
					Expires
				</Input>
			</div>
			<div className="row">
				<Input
					className="card__cardholder"
					id="cardholder"
					value={cardholder}
					placeholder="IVAN PETROV"
					onChange={onChangeCardholder}
				>
					Cardholder name
				</Input>
				<div className="card__change-side">
					<Zoom when={isAllFieldsFrontFilled} duration={500}>
						<Button
							className="cvc-btn"
							type="submit"
							onClick={changeActiveSide}
						>
							CVC 
							<FontAwesomeIcon icon={faSync} />
						</Button>
					</Zoom>
				</div>
			</div>
		</div>
	</div>

const BackSide = ({ cvc, isCvcFilled, onChangeCvcNum, changeActiveSide, onProceedPayment }) =>
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
							id="cvc"
							value={cvc}
							width="50"
							onChange={onChangeCvcNum}
						>
							CVC
						</Input>
					</div>
			</div>
		</div>
		<div className="card-btn__approval">
			<Slide when={isCvcFilled} left>
				<Button
					className="card-btn approval-btn"
					type="button"
					onClick={onProceedPayment}
				>
					Proceed payment
				</Button>
			</Slide>
		</div>
	</div>

class Card extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			creditNum: "",
			cardholder: "",
			expires: "",
			cvc: "",
			isCvcFilled: false,
			activeSide: "front",
			paymentSuccess: false,
			paymentSystem: Services.default,
			isAllFieldsFrontFilled: false,
		}

		this.isAllFieldsFrontFilled = this.isAllFieldsFrontFilled.bind(this);
		this.isWhatPaymentSystem = this.isWhatPaymentSystem.bind(this);
		this.onChangeCardNum = this.onChangeCardNum.bind(this);
		this.onChangeExpires = this.onChangeExpires.bind(this);
		this.onChangeCardholder = this.onChangeCardholder.bind(this);
		this.onChangeCvcNum = this.onChangeCvcNum.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.changeActiveSide = this.changeActiveSide.bind(this);
		this.onProceedPayment = this.onProceedPayment.bind(this);
	}
	
	changeActiveSide() {
		this.state.activeSide === 'front'
			? this.setState({ activeSide: 'back' })
			: this.setState({ activeSide: 'front' });
	}

	isAllFieldsFrontFilled() {
		if (this.state.creditNum && this.state.cardholder && this.state.expires) {
			this.setState({ isAllFieldsFrontFilled: true })
		} else {
			this.setState({ isAllFieldsFrontFilled: false })
		}
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

	addSpace(str, offset) {
		let re = new RegExp(`(\\d{${offset}}(?=(?:\\d)+(?!\\d)))`, 'g');
		return str.replace(re, "$1 ");
  	}

	onChangeCardNum(event) {
		let value = this.addSpace(event.target.value, 4);
		let inputSymbol = value.slice(-1);

		if (value.length <= 19 && (/\d/.test(inputSymbol) || /^$/.test(inputSymbol))) {
			this.setState(
				{ creditNum: value },
				() => {
					this.isWhatPaymentSystem();
					this.isAllFieldsFrontFilled();
				}
			);
		} else { event.preventDefault() }

	}

	onChangeExpires(event) {
		let value = this.addSpace(event.target.value, 2);
		let inputSymbol = value.slice(-1);

		if (value.length <= 5 && (/\d/.test(inputSymbol) || /^$/.test(inputSymbol))) {
			this.setState(
				{ expires: value },
				() => this.isAllFieldsFrontFilled()
			);
		} else { event.preventDefault() }

	}

	onChangeCardholder(event) {
		let inputSymbol = event.target.value.slice(-1);

		if (/\D/.test(inputSymbol) || /^$/.test(inputSymbol)) {
			this.setState(
				{ cardholder: event.target.value },
				() => this.isAllFieldsFrontFilled()
			);
		} else { event.preventDefault() }

	}

	onChangeCvcNum(event) {
		let value = event.target.value;
		let inputSymbol = event.target.value.slice(-1);

		if (value.length === 3) {
			this.setState({ isCvcFilled: true });
		} else if (value.length < 3) {
			this.setState({ isCvcFilled: false });
		}

		if (value.length <= 3 && (/\d/.test(inputSymbol) || /^$/.test(inputSymbol))) {
			this.setState({ cvc: value });
		} else { event.preventDefault() }
	}

	onSubmit(event) {
		this.changeActiveSide();
		event.preventDefault();
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
			isCvcFilled,
			paymentSystem,
			isAllFieldsFrontFilled,
			activeSide,
			paymentSuccess
		} = this.state;

		let ViewSide;

		if (activeSide === 'front' && !paymentSuccess) {
			ViewSide = 
				<Fade duration={1000} left>
					<FrontSide
						creditNum={creditNum}
						expires={expires}
						cardholder={cardholder}
						isAllFieldsFrontFilled={isAllFieldsFrontFilled}
						paymentSystem={paymentSystem}
						changeActiveSide={this.changeActiveSide}
						onChangeCardNum={this.onChangeCardNum}
						onChangeExpires={this.onChangeExpires}
						onChangeCardholder={this.onChangeCardholder}
					/>
				</Fade>
		} else if (activeSide === 'back' && !paymentSuccess) {
			ViewSide =
				<Flip left>
					<BackSide
						cvc={cvc}
						isCvcFilled={isCvcFilled}
						onChangeCvcNum={this.onChangeCvcNum}
						changeActiveSide={this.changeActiveSide}
						onProceedPayment={this.onProceedPayment}
					/>
				</Flip>
		} else {
			ViewSide =
				<Zoom duration={1000} top>
					<div className="success">
						<FontAwesomeIcon 
							icon={faCheckDouble}
							color="green"
							style={{ paddingBottom: "20px", fontSize: "1.2em" }}
						/>
						<h2>Thank you!</h2>
						<h3>Payment accepted</h3>
					</div>
				</Zoom>
		}



		return ViewSide;
	}
}

const App = () =>
	<div className="wrapper">
		<Fade delay={900} bottom>
			<div className="card-details">Your credit card details</div>
		</Fade>
		<Card/>
	</div>

export default App;
