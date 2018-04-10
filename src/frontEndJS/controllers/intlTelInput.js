const utils = require('intl-tel-input/build/js/utils');

export default class InternationalTelInputController {
	constructor(){
		this.process();
	}
	process(){
		const options = {
			initialCountry: "auto",
			geoIpLookup: function(callback) {
				$.get('https://ipinfo.io', () => {}, "jsonp").always((resp) => {
					const countryCode = (resp && resp.country) ? resp.country : "";
					callback(countryCode);
				});
			}
		};
		$("#phone").intlTelInput(options, utils);
	}
}