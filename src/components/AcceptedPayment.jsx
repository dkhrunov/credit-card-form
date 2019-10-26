import React from 'react';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';

const AcceptedPayment = () => (
	<div className="success">
		<FontAwesomeIcon 
			icon={faCheckDouble}
			color="green"
			style={{ paddingBottom: "20px", fontSize: "1.2em" }}
		/>
		<h2>Thank you!</h2>
		<h3>Payment accepted</h3>
	</div>
)

export default AcceptedPayment;