/**
 * @programmatic_validator for FilenameInput
 */


var validator = (function(uniqueID, options) {
	
	// Filename validation
	var constraints = {
		format : {
			pattern : /[a-zA-Z0-9_-]+\.[a-zA-Z0-9]{3,4}/,
			message: ['^This doesn\'t look like a valid filename : "name.ext"']
		},
		presence : {
			allowEmpty: false,
			message: "^The Filename is required"	// when validating single values, validate.js neither know which name to use nor uses the default message, 
		}
	}
	
	return constraints;
})();

module.exports = validator;