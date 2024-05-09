/**
 * @constructor NamedButton
*/

const {TemplateFactory, Components} = require('formantCore');
var SimpleText = require('src/UI/categories/basics/SimpleText/SimpleText');

var createNamedButtonHostDef = require('src/UI/categories/forms/NamedButton/componentDefs/NamedButtonHostDef');
//var createNamedButtonSlotsDef = require('src/UI/categories/forms/NamedButton/componentDefs/NamedButtonSlotsDef');

var NamedButton = function(definition, parentView, parent) {
	Components.ComponentWithView.call(this, definition, parentView, parent);
	this.objectType = 'NamedButton';
}
NamedButton.prototype = Object.create(SimpleText.prototype);
NamedButton.prototype.objectType = 'NamedButton';


NamedButton.prototype.createDefaultDef = function() {
	const def = SimpleText.prototype.createDefaultDef(TemplateFactory.mockDef());
	def.getHostDef().sWrapper = createNamedButtonHostDef().getHostDef().sWrapper;
	return def;
}

NamedButton.prototype.registerClickEvents = function() {
	this.view.getMasterNode().addEventListener('mouseup', this.handleClickEvent.bind(this));
}
NamedButton.prototype.handleClickEvent = function(e) {
	// TODO: define an EventPayload factory in the TemplateFactory
	this.trigger('update', {grandParent_key : this._parent._parent._key, parent_key : this._parent._key, self_depth : this.getSelfDepth(), self_key : this._key, self_UID : this._UID}, true);
}

module.exports = NamedButton;