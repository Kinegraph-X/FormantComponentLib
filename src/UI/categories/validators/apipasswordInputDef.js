/**
 * @programmatic_validator for PasswordInput
 */


var validator = (function(uniqueID, options) {
	
	// Password validation
	var constraints = {
		format : {
			pattern : /[a-zA-Z_]+/,
			message: ["^The Password must contain only alphanumeric or underscore characters"]
		},
		length : {
			minimum : 8,
			message : '^The Password must be at least 8 characters long'
		},
		presence : {
			allowEmpty: false,
			message: "^The Password is required"	// when validating single values, validate.js neither know which name to use nor uses the default message, 
		}
	}
	
	return constraints;
})();

module.exports = validator;