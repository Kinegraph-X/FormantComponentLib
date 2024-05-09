/**
 * @programmatic_validator for TextInput
 */


var validator = (function(uniqueID, options) {
	
	// Username validation
	var constraints = {
//		length : {
//			minimum : 0,
//			message : '^The Username is optional.'
//		},
		presence : {
			allowEmpty: true,
			message : '^The Username is optional.'
		}
	}
	
	return constraints;
})();

module.exports = validator;