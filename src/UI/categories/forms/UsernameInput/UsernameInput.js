/**
 * @constructor UsernameInput
*/

//const Component = require('src/core/Component');
const TextInput = require('src/UI/categories/forms/TextInput/TextInput');


const UsernameInput = function() {
	TextInput.apply(this, arguments);
	this.objectType = 'UsernameInput';
}
UsernameInput.prototype = Object.create(TextInput.prototype);
UsernameInput.prototype.objectType = 'UsernameInput';
//Component.ExtensibleObject.prototype.getCleanDefAfterExtension(UsernameInput);

module.exports = UsernameInput;