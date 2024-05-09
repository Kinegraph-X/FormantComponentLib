/**
 * @constructor EMailInput
*/

//var Component = require('src/core/Component');
var TextInput = require('src/UI/categories/forms/TextInput/TextInput');


var EMailInput = function() {
	TextInput.apply(this, arguments);
	this.objectType = 'EMailInput';
}
EMailInput.prototype = Object.create(TextInput.prototype);
EMailInput.prototype.objectType = 'EMailInput';
//Component.ExtensibleObject.prototype.getCleanDefAfterExtension(EMailInput);

module.exports = EMailInput;