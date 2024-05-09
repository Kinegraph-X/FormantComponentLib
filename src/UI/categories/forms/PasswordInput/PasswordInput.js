/**
 * @constructor PasswordInput
*/

//var Component = require('src/core/Component');
const TextInput = require('src/UI/categories/forms/TextInput/TextInput');

const PasswordInput = function(def) {
//	console.log(def)

	TextInput.apply(this, arguments);
	this.objectType = 'PasswordInput';

}
PasswordInput.prototype = Object.create(TextInput.prototype);
PasswordInput.prototype.objectType = 'PasswordInput';
//Component.ExtensibleObject.prototype.getCleanDefAfterExtension(PasswordInput);




module.exports = PasswordInput;