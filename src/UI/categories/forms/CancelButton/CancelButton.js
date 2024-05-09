/**
 * @constructor CancelButton
 * 
*/
const {TemplateFactory, Components} = require('formantCore');
const typedInputInterface = require('src/UI/_interfaces/typedInputInterface');

const createCancelButtonDef = require('src/UI/categories/forms/CancelButton/componentDefs/cancelButtonDef');

let CancelButton = function() {
	Components.ComponentWithHooks.apply(this, arguments);
	this.objectType = 'CancelButton';
}
CancelButton.prototype = Object.create(Components.ComponentWithHooks.prototype);
CancelButton.prototype.objectType = 'CancelButton';

CancelButton = Components.ExtensibleObject.prototype.addInterface(CancelButton, typedInputInterface);

CancelButton.prototype.createEvents = function() {
	this.createEvent('clicked_ok');
	this.createEvent('cancel');
}

CancelButton.prototype.createDefaultDef = function() {
	const def = TemplateFactory.createHostDef({
			nodeName : 'button',
			attributes : [
				{title : '-Cancel'}
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
			sWrapper : createCancelButtonDef().getHostDef().sWrapper
	});
	return def;
}

CancelButton.prototype.afterCreateDOM = function() {
//		this.view.getMasterNode()['value'] = this.def.title;
//		if (this.def.sWrapper && this.def.sWrapper.styleElem)
//			this.view.getMasterNode().appendChild(this.def.sWrapper.styleElem);
}

CancelButton.prototype.afterRegisterEvents = function() {
	var self = this;
	this.view.currentViewAPI.getMasterNode().addEventListener('mouseup', function(e) {
		self.trigger('clicked_ok');
	});
	this.onclicked_ok = this._parent.trigger.bind(this._parent, 'cancel');
}
	

module.exports = CancelButton;