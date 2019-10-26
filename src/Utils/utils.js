export const addSpace = (str, offset) => {
	let re = new RegExp(`(\\d{${offset}}(?=(?:\\d)+(?!\\d)))`, 'g');
	return str.replace(re, "$1 ");
}

export const isNumberKey = (event) => {
	var charCode = (event.which) ? event.which : event.keyCode;
	if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
		event.preventDefault();
	}
}

export default {
	addSpace,
	isNumberKey
}