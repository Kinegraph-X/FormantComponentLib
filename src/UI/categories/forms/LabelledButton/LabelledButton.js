/**
 * @constructor LabelledButton
*/

const {TemplateFactory, Components} = require('formantCore');

var labelledButtonInterface = require('src/UI/_interfaces/labelledButtonInterface');

var createLabelledButtonHostDef = require('src/UI/categories/forms/LabelledButton/componentDefs/LabelledButtonHostDef');
//var createLabelledButtonSlotsDef = require('src/UI/categories/forms/LabelledButton/componentDefs/LabelledButtonSlotsDef');

var LabelledButton = function(definition, parentView, parent) {
	Components.ComponentWithHooks.call(this, definition, parentView, parent);
	this.objectType = 'LabelledButton';
}
LabelledButton.prototype = Object.create(Components.ComponentWithHooks.prototype);
LabelledButton.prototype.objectType = 'LabelledButton';

LabelledButton = Components.ExtensibleObject.prototype.addInterface(LabelledButton, labelledButtonInterface);

LabelledButton.prototype.createDefaultDef = function() {
	return createLabelledButtonHostDef();
}

module.exports = LabelledButton;