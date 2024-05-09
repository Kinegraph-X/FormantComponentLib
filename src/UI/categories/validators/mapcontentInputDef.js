/**
 * @programmatic_validator for TextInput
 */


var validator = (function(uniqueID, options) {
	
	// Username validation
	var constraints = {
		length : {
			minimum : 1,
			message : '^No content Found'
		}
	}
	
	return constraints;
})();

module.exports = validator;