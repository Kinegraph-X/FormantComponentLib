/**
 * 
 * @constructor BoolSelector
 * 
*/



const {TemplateFactory, Components, appConstants} = require('formantCore');

const BoolSelectorDef = require('src/UI/categories/forms/BoolSelector/componentDefs/boolSelectorDef');


const Slider = require('src/UI/categories/basics/AbstractSlider/AbstractSlider');
//const orientationDependantInterface = require('src/UI/_interfaces/orientationDependantInterface');
const labelledInputInterface = require('src/UI/_interfaces/labelledInputInterface');
const typedInputInterface = require('src/UI/_interfaces/typedInputInterface');



	
let BoolSelector = function(definition, parentView, parent) {
	this.limitExcursionToInner = true;
	this.orientation = 'horizontal';
	this.min = 0;
	this.max = 1;
	this.step = 1;
	Slider.call(this, definition, parentView, parent);
	this.objectType = 'BoolSelector';
	
	var self = this;
	this.addEventListener('change', function(e) {
		self.streams.toggle.value = e.data === self._valueMax() ? true : null;
		self.trigger('update', {toggle : self.streams.toggle.value});
	});
}

/**
 * @chained_inheritance BoolSelector <= Slider <= ComponentWithHooks
 */
var proto_proto = Object.create(Components.ComponentWithHooks.prototype);
Object.assign(proto_proto, Slider.prototype);
BoolSelector.prototype = Object.create(proto_proto);
BoolSelector.prototype.objectType = 'BoolSelector';

//	BoolSelector = Components.ExtensibleObject.prototype.addInterface(BoolSelector, orientationDependantInterface);
BoolSelector = Components.ExtensibleObject.prototype.addInterface(BoolSelector, labelledInputInterface);
BoolSelector = Components.ExtensibleObject.prototype.addInterface(BoolSelector, typedInputInterface);

BoolSelector.prototype.createDefaultDef = function() {
	return TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			nodeName : 'toggle-selector',
			states : [
				{toggle : undefined}
			],
			sWrapper : BoolSelectorDef().getHostDef().sWrapper
		}, null, 'hostOnly'),
		members : [
			TemplateFactory.createDef({
				nodeName : 'div',
				attributes : [
					{id : 'slider-track-' + TypeManager.UIDGenerator.newUID()},
					{title : 'On/Off Selector'},
					{className : 'slider-horizontal'}
				]
			}, null, 'hostOnly')
		]
	}, null, 'rootOnly');
}

BoolSelector.prototype._mouseUp = function(e) {
	if (this._mouseStarted) {
		if (!this._mouseMovement) {
			this._value = this._value !== this._valueMax() ? this._valueMax() : this._valueMin();
			this.handle.style.left = this._value === this._valueMax() ? this._maxPixelsInner.x.toString() + 'px' : 0;
			this.streams.toggle.value = this._value === this._valueMax() ? true : null;
			this.trigger('update', {toggle : this.streams.toggle.value});
		}
		
		document.removeEventListener('mousemove', this._mouseMove);
	}
		
	this._mouseStarted = false;
	this._mouseMovement = false;
}
	

module.exports = BoolSelector;