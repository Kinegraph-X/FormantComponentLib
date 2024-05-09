/**
 * @constructor SubmitButton
 * 
*/
const {TemplateFactory, Components} = require('formantCore');
const typedInputInterface = require('src/UI/_interfaces/typedInputInterface');

const createSubmitButtonDef = require('src/UI/categories/forms/SubmitButton/componentDefs/submitButtonDef');
//	console.log(createSubmitButtonDef);

let SubmitButton = function() {
	Components.ComponentWithHooks.apply(this, arguments);
	this.objectType = 'SubmitButton';
}
SubmitButton.prototype = Object.create(Components.ComponentWithHooks.prototype);
SubmitButton.prototype.objectType = 'SubmitButton';

SubmitButton = Components.ExtensibleObject.prototype.addInterface(SubmitButton, typedInputInterface);

SubmitButton.prototype.createEvents = function() {
	this.createEvent('clicked_ok');
}

SubmitButton.prototype.createDefaultDef = function() {
	return TemplateFactory.createHostDef({
			nodeName : 'submit-button',
			attributes : [
				{title : '-Submit'}
			],
			props : [
//				{text : undefined},
				{content : undefined}
			],
			reactOnSelf : [
				{
					cbOnly : true,
					to	 : 'content',
					subscribe : this.appendContentFromValueOnView,
				},
				{
					from : 'text',
					to : 'content',
				}
			],
			sWrapper : createSubmitButtonDef().getHostDef().sWrapper
	});
}

SubmitButton.prototype.afterCreateDOM = function() {
//	this.view.getMasterNode()['value'] = this.def.title;
//	if (this.def.sWrapper && this.def.sWrapper.styleElem)
//		this.view.getMasterNode().appendChild(this.def.sWrapper.styleElem);
}

SubmitButton.prototype.afterRegisterEvents = function() {
//	console.log(this._parent)
	var self = this;
	this.view.currentViewAPI.getMasterNode().addEventListener('mouseup', function(e) {
		self.trigger('clicked_ok');
	});
	this.onclicked_ok = this._parent.trigger.bind(this._parent, 'submit');
}
	

module.exports = SubmitButton;