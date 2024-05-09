/**
 * @programmatic_validator for EMailInput
 */


var validator = (function(uniqueID, options) {
	
	// E-Mail validation
	var constraints = {
		email : {
			message: "^This address doesn't look like a valid E-Mail"
		},
		presence : {
			allowEmpty: false,
			message: "^The E-Mail address is required"	// when validating single values, validate.js neither know which name to use nor uses the default message, 
		}
	}
	
	return constraints;
})();

module.exports = validator;