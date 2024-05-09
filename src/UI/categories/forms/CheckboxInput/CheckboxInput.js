/**
 * @constructor CheckboxInput
*/

const {TemplateFactory, Components} = require('formantCore');

const createCheckboxInputDef = require('src/UI/categories/forms/CheckboxInput/componentDefs/checkboxInputDef');

const labelledCheckboxInputInterface = require('src/UI/_interfaces/labelledCheckboxInputInterface');
//const validableInterface = require('src/UI/_interfaces/validableInterface');
const locallySavableInputInterface = require('src/UI/_interfaces/locallySavableInputInterface');

let CheckboxInput = function(definition, parentView, parent) {
	this.savableStore = definition.options.savableStore;
	Components.ComponentWithReactiveText.call(this, definition, parentView, parent);
	this.objectType = 'CheckboxInput';
}
CheckboxInput.prototype = Object.create(Components.ComponentWithReactiveText.prototype);
CheckboxInput.prototype.objectType = 'CheckboxInput';

CheckboxInput = Components.ExtensibleObject.prototype.addInterface(CheckboxInput, labelledCheckboxInputInterface);
CheckboxInput = Components.ExtensibleObject.prototype.addInterface(CheckboxInput, locallySavableInputInterface);

CheckboxInput.prototype.createEvents = function() {
//	GenericComponent.prototype.createEvents.call(this);
//	this.createEvent('checked');
}

CheckboxInput.prototype.createDefaultDef = function() {
	return TemplateFactory.createHostDef({
		nodeName : 'smart-input',
		attributes : [
			{role : 'checkbox'}
		],
		props : [
			{checked : undefined}
		],
		reactOnSelf : [
			{
				from : 'checked',
				cbOnly : true,
				map : function(value) {return value ? 'checked' : null},	// TODO: double-check the MDN: although it seems {String|null} is allowed, this prop returns a real boolean
				subscribe : function(value) {
					this.view.subViewsHolder.memberViews[1].getMasterNode().checked = value;
				}
			}
		],
		sWrapper : createCheckboxInputDef().getHostDef().sWrapper,
	});
}

CheckboxInput.prototype.registerClickEvents = function() {
	var self = this;
	this.view.subViewsHolder.memberViews[1].getMasterNode().addEventListener('change', function(e) {
		self.trigger('update', {checked : self.view.subViewsHolder.memberViews[1].getMasterNode().checked ? 'checked' : null});
//		self.trigger('checked', {checked : self.view.subViewsHolder.memberViews[1].getMasterNode().checked ? 'checked' : null});
	})
}

CheckboxInput.prototype.getValue = function() {
	// we can't use the stream's value cause passing a transform function in the stream's definition isn't yet implemented
//	return this.streams.checked.value;
	return this.view.subViewsHolder.memberViews[1].getMasterNode().checked;
}

CheckboxInput.prototype.setValue = function(value) {
	this.streams.checked.value = value;
}






module.exports = CheckboxInput;