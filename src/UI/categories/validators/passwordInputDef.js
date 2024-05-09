/**
 * @programmatic_validator for PasswordInput
 */


var validator = (function(uniqueID, options) {
	
	// Password validation
	var constraints = {
		format : {
			pattern : /^(?:[a-z]+[a-zA-Z]*(?:@|\?|\||\#)+\w*[A-Z]+[a-zA-Z]*|[a-zA-Z]*[A-Z]+[a-zA-Z]*(?:@|\?|\||\#)+\w*[a-z]+)+[a-zA-Z]+$/,
			message: ["^The Password must contain one of these special characters : @, ?, |, # (at a position -not- being start or end)",
					"The Password must contain lower -and- upper case"]
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