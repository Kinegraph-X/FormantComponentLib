/**
 * @constructor ColorPickerSliderInput
*/

const {TemplateFactory, CreateStyle, Components} = require('formantCore');

const ColorPickerSliderInput = function(definition, parentView) {
	const def = definition || null;
	Components.ComponentWithHooks.call(this, def, parentView);
	this.objectType = 'ColorPickerSliderInput';
	
	this.absolutLeft = 0;
	this.xMin = definition.options.xMin || 0;
	this.xMax = definition.options.xMax || 400;
	this.leftOffset = definition.options.initialLeft || 0;
	this.initialClickOffset = 0;
}
ColorPickerSliderInput.prototype = Object.create(Components.ComponentWithHooks.prototype);
ColorPickerSliderInput.prototype.objectType = 'ColorPickerSliderInput';

ColorPickerSliderInput.prototype.createDefaultDef = function() {
	return TemplateFactory.createDef({
		host: TemplateFactory.createDef({
			nodeName: 'triangle-colorpicker',
			props : [
				{
					currentColor : undefined
				}
			],
			reactOnSelf : [
				{
					from : 'currentColor',
					cbOnly: true,
					subscribe : function(value) {
						this.view.subViewsHolder.memberViews[1].getMasterNode().value = value;
						this.view.subViewsHolder.memberViews[2].getMasterNode().textContent = value;
						this.trigger('update', {type : 'colorChanged', value : value, key : this._key}, true);
					}
				}
			],
			sWrapper: CreateStyle([
				{
					selector: ':host',
					color : '#999',
					position : 'absolute',
					top : '0',
					display : 'flex',
					alignItems : 'center',
					fontSize : '14px',
					marginTop : '-22px'
				},
				{
					selector: ':host div',
					display : 'inline-block'
				},
				{
					selector: ':host div:nth-child(4)',
					display : 'inline-block',
					marginTop : '-42px',
					marginLeft : '4px'
				},
				{
					selector: ':host div.arrow',
					height: '0',
					width: '0',
					borderTop: '22px #DC2 solid',
					borderRight: '8px #00000000 solid',
					borderLeft: '8px #00000000 solid',
					cursor : 'pointer'
				},
				{
					selector: ':host input[type="color"]',
					border: '1px #AAA solid',
					padding: '0',
					width: '16px',
					height: '16px',
					margin : '-42px 0px 0px -16px',
					outline: 'none'
				},
				{
					selector : ':host input[type="color"]::-webkit-color-swatch',
					border : '0',
					padding : '0'
				},
				{
					selector : ':host input[type="color"]::-webkit-color-swatch-wrapper',
					border : '0',
					padding : '0'
				}
			])
		}),
		members: [
			TemplateFactory.createDef({
				nodeName: 'div',
				attributes : [
					{className : 'arrow'}
				]
			}),
			TemplateFactory.createDef({
				nodeName: 'input',
				attributes: [
					{ 'type': 'color' }
				]
			}),
			/* displays the value of the color-picker */
			TemplateFactory.createDef({
				nodeName: 'div'
			})
		]
	})
}

ColorPickerSliderInput.prototype._asyncRegisterTasks = [];
ColorPickerSliderInput.prototype._asyncRegisterTasks.push(new TemplateFactory.TaskDefinitionModel({
	type : 'lateBinding',
	task : function() {
//		this.view.subViewsHolder.memberViews[1].getMasterNode().value;
//		this.view.subViewsHolder.memberViews[2].getMasterNode().textContent = this.view.subViewsHolder.memberViews[1].getMasterNode().value;
		this.view.getMasterNode().style.left = this.absolutLeft + this.leftOffset + 'px';
		this.view.getMasterNode().style.transform = 'translate(-8px)';
	}
}));

ColorPickerSliderInput.prototype.registerClickEvents = function() {
	this.view.subViewsHolder.memberViews[1].getMasterNode().addEventListener('input', function(e) {
		this.view.subViewsHolder.memberViews[2].getMasterNode().textContent = e.target.value;
		this.trigger('update', {type : 'colorChanged', value : e.target.value, key : this._key}, true);
	}.bind(this));
	
	this.view.subViewsHolder.memberViews[0].getMasterNode().addEventListener('mousedown', function(e) {
		e.target.setPointerCapture(e.pointerId);
		this.initialClickOffset = e.clientX - this.absolutLeft - this.leftOffset;
		this.handleDrag.call(this);
	}.bind(this))
}

ColorPickerSliderInput.prototype.handleDrag = function() {
	const dragHandler = this.dragHandler.bind(this);
	document.body.addEventListener('mousemove', dragHandler);
	document.body.addEventListener('mouseup', function(e) {
		e.target.releasePointerCapture(e.pointerId);
		this.leftOffset = parseInt(this.view.getMasterNode().style.left.slice(0, -2));
		document.body.removeEventListener('mousemove', dragHandler);
	}.bind(this));
}

ColorPickerSliderInput.prototype.dragHandler = function(e) {
	const moveOffset = e.clientX - this.initialClickOffset - this.absolutLeft;
	if (moveOffset < this.xMax && moveOffset > this.xMin) {
		this.view.getMasterNode().style.left = this.absolutLeft + moveOffset + 'px';
		this.trigger('update', {type : 'positionChanged', value : Math.round(moveOffset * 100 / this.xMax), key : this._key}, true);
	}
}





module.exports = ColorPickerSliderInput;