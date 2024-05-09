/**
 * @constructor Slider
 * A free implementation of the main design choices of the jQuery Slider Widget
 * 
*/
const {TemplateFactory, CoreTypes, Components, appConstants} = require('formantCore');
const orientationDependantInterface = require('src/UI/_interfaces/orientationDependantInterface');

const createAbstractSliderHandleDef = require('src/UI/categories/basics/AbstractSlider/componentDefs/abstractSliderHandleDef');

/**
 * @constructor Slider
 * 
*/
const Slider = function(definition, parentView, parent) {
//	console.log('componentWithHooks');
	Components.ComponentWithHooks.call(this, definition, parentView, parent);
	this.objectType = 'Slider';
	
	this.limitExcursionToInner = typeof this.limitExcursionToInner !== 'undefined' ? this.limitExcursionToInner : false;
	this.orientation = typeof this.orientation !== 'undefined' ? this.orientation : 'horizontal';
	this.min = typeof this.min !== 'undefined' ? this.min : 0;
	this.max = typeof this.max !== 'undefined' ? this.max : 100;
	this.step = typeof this.step !== 'undefined' ? this.step : 1;
	
	this._clickOffset = {left : 0, top : 0};
	this.trackElementSize = {h : 0, w : 0};
	this.trackElementOffset = {left : 0, top : 0};
	this.handleSize = {h : 0, w : 0};
	this._mouseMove = this._mouseMove.bind(this);
//	console.log('slider-handle');
	// INTERESTING HACK :)
	// A memberView in a memberView (works in the ctor but should also be handled smoothly in an interface)
	this.view.subViewsHolder.memberViews.push(new CoreTypes.ComponentSubView(createAbstractSliderHandleDef(), this.view.subViewsHolder.memberViews[1]));
	
	this._value = this.min;
	this.handleElem;
	
	this._mouseStarted = false;
	this._mouseMovement = false;
	
	this.onDOMReadyInit();
	
//	var self= this;
//	setTimeout(function() {
//		console.log(self.trackElementSize, self.trackElementOffset);
//		setTimeout(function() {
//			console.log(self.trackElementSize, self.trackElementOffset);
//		}, 1024);
//	}, 1024);
	
}

Slider.prototype = Object.create(Components.ComponentWithHooks.prototype);
Slider.prototype.objectType = 'Slider';


//	Slider = Factory.CoreModule.addInterface(Slider, orientationDependantInterface);

Slider.prototype.createEvents = function(def, container) {
	this.createEvent('slide');
	this.createEvent('change');
	this.createEvent('start');
	this.createEvent('stop');
}

Slider.prototype.createDefaultDef = function() {
	return TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			nodeName : 'smooth-slider'
		}),
		members : [
			TemplateFactory.createDef({
				nodeName : 'button',
				attributes : [
					{id : 'slider-action-up-' + TemplateFactory.UIDGenerator.newUID()},
					{className : 'triangle-left'}
				]
			}),
			TemplateFactory.createDef({
				nodeName : 'div',
				attributes : [
					{id : 'slider-track-' + TemplateFactory.UIDGenerator.newUID()},
					{className : 'slider-horizontal'}
				]
			}),
			TemplateFactory.createDef({
				nodeName : 'button',
				attributes : [
					{id : 'slider-action-down-' + TemplateFactory.UIDGenerator.newUID()},
					{className : 'triangle-right'}
				]
			})
		]
	});
}

Slider.prototype.onDOMReadyInit = function() {
	var self = this;
	var inter = setInterval(function() {
		
		if (self.view.getWrappingNode() && self.view.getWrappingNode().querySelector('div')) {
			clearInterval(inter);
			// ResizeObserver needs to be configured depending on the observed box : content-box (the default), and border-box.
			appConstants.resizeObserver.observe(self.view.getWrappingNode().querySelector('div'), self.getTrackDimensions.bind(self));
			appConstants.resizeObserver.observe(self.view.getWrappingNode().querySelector('slider-handle'), self.getHandleDimensions.bind(self));
		}
	}, 512);
}

Slider.prototype.getTrackDimensions = function(e) {
	this.trackElementSize = {w : e.data.boundingBox.w, h : e.data.boundingBox.h};
	this.trackElementOffset.left = this.view.getWrappingNode().querySelector('div').offset().left;
	this.trackElementOffset.top = this.view.getWrappingNode().querySelector('div').offset().top;
	
	if (this.handleSize.w) {
		this._maxPixelsInner = {
				x : this.trackElementSize.w - this.handleSize.w - 1,
				y : this.trackElementSize.h - this.handleSize.h - 1
		}
	}
	appConstants.resizeObserver.unobserve(this.view.getWrappingNode().querySelector('div'));
}

/**
 * @param e {resizeObserver_event}
 */
Slider.prototype.getHandleDimensions = function(e) {
	this.handleElem = this.view.getWrappingNode().querySelector('slider-handle');

	var marginTop;
	this.handleSize = {
		w : e.data.boundingBox.w,
		h : e.data.boundingBox.h,
		marginTop : parseInt((marginTop = window.getComputedStyle(this.handleElem).marginTop) ? marginTop.match(/\d+/)[0] : 0, 10)
	};
	
	
	if (this.trackElementSize.w) {
		this._maxPixelsInner = {
				x : this.trackElementSize.w - this.handleSize.w - 1,
				y : this.trackElementSize.h - this.handleSize.h - 1
		}
		
		if (this.orientation === 'vertical' && this.handleSize.h > this.trackElementSize.h) {
			// TODO: define an algo and update the sWrapper
			// And solve the arbitrary lineHeight, as there are issues with tiny ranges onMouseWheel
			this.handleSize.h = this.handleSize.h / 4;
			this.handleElem.style.height = (this.handleElem.clientHeight / 4).toString() + 'px';
		}
		else if (this.orientation === 'horizontal' && this.handleSize.w > this.trackElementSize.w) {
			// TODO: define an algo and update the sWrapper
			// And solve the arbitrary lineHeight, as there are issues with tiny ranges onMouseWheel
			this.handleSize.w = this.handleSize.w / 4;
			this.handleElem.style.width = (this.handleElem.clientWidth / 4).toString() + 'px';
		}
	}
	appConstants.resizeObserver.unobserve(this.view.getWrappingNode().querySelector('slider-handle'));
}

Slider.prototype._valueMin = function() {
	return this.min;
}

Slider.prototype._valueMax = function() {
	return this.max;
}

Slider.prototype.registerClickEvents = function() {
	var self = this;
//	this.view.getWrappingNode().querySelector('div').addEventListener('mousedown', function(e) {
//		e.stopPropagation();
//		self._mouseStarted = true;
//	});
	this.view.getWrappingNode().querySelector('slider-handle').addEventListener('mousedown', function(e) {
		e.stopPropagation();
		self._mouseStarted = true;
		self.handleElem.setAttribute('hovered', 'hover');
		self._mouseDown(e);
	});
	document.addEventListener('mouseup', this._mouseUp.bind(this));
}

Slider.prototype._mouseDown = function(e) {
	this._clickOffset = this._getClickOffset(e);
	document.addEventListener('mousemove', this._mouseMove);
}

Slider.prototype._mouseUp = function(e) {
	if (this._mouseStarted)
		document.removeEventListener('mousemove', this._mouseMove);
	this._mouseStarted = false;
	this._mouseMovement = false;
	this.handleElem.removeAttribute('hovered');
}

Slider.prototype._mouseMove = function(e) {
	this._mouseMovement = true;
	var position = {x: e.pageX, y: e.pageY};
	
	var mouseNormValue = this._normValueFromMouse(position, this._clickOffset);
	// Then we must round and trim to get a value that is "centered" on a step, and included, as a safety, in the range
	// the Component must reflect after that the "numeric" value of the slider
	this._value = this._trimAlignValue(mouseNormValue);

	this.setPosition();
		
	if (this._mouseStarted) {
		this.trigger('change', this._value);
		this.trigger('slide', {value : this._value});
	}
}

Slider.prototype._normValueFromMouse = function(position, _clickOffset) {
	var pixelTotal,
		pixelMouse,
		percentMouse,
		valueTotal,
		valueMouse;

	

	if (this.orientation === "horizontal") {
		pixelTotal = this.trackElementSize.w;
		pixelMouse = position.x - this.trackElementOffset.left - _clickOffset.left;
	} else {
		pixelTotal = this.trackElementSize.h;
		pixelMouse = position.y - this.trackElementOffset.top - _clickOffset.top;
	}
	
	// Passing by, we handle the slider/checkbox difference: the checkbox must constrain its values inside the range, handle size included.
	// And we shall have to repeat the operation as we need the value to go till _maxValue, so we correct the percentage based on pixels
	// but we need to make the  inverse operation in setPosition() to constrain the % offset in the inner range
	var maxExcursionPercent = this.limitExcursionToInner
								? (this.orientation === 'horizontal'
									? (this.trackElementSize.w - this.handleSize.w) / this.trackElementSize.w 
										: (this.trackElementSize.h - this.handleSize.h) / this.trackElementSize.h) 
											: 1;
	
	percentMouse = pixelMouse / (pixelTotal * maxExcursionPercent);
	if ( percentMouse > 1 ) {
		percentMouse = 1;
	}
	else if ( percentMouse < 0 ) {
		percentMouse = 0;
	}
	
	// implement uncommented if used as a power slider
//	if ( this.orientation === "vertical" ) {
//		percentMouse = 1 - percentMouse;
//	}
	
	valueTotal = this._valueMax() - this._valueMin();
	valueMouse = this._valueMin() + percentMouse * valueTotal;
	return valueMouse;
}

Slider.prototype._trimAlignValue = function(val) {
	if ( val <= this._valueMin() ) {
		return this._valueMin();
	}
	if ( val >= this._valueMax() ) {
		return this._valueMax();
	}
	
	var step = (this.step > 0) ? this.step : 1,
		valModStep = (val - this._valueMin()) % step,
		alignValue = val - valModStep;

	if (Math.abs(valModStep) * 2 >= step) {
		alignValue += (valModStep > 0) ? step : (-step);
	}
	
	return alignValue;
};

Slider.prototype._getClickOffset = function(event) {
	
	var offset = this.handleElem.offset();
	return {
			left: event.pageX - offset.left - this.handleSize.w / 2,
			top: (event.pageY - offset.top + this.handleSize.marginTop)
	};
}

Slider.prototype.setPosition = function() {

	var maxExcursionPercent = this.limitExcursionToInner
								? (this.orientation === 'horizontal'
									? (this.trackElementSize.w - this.handleSize.w) * 100 / this.trackElementSize.w 
										: (this.trackElementSize.h - this.handleSize.h) * 100 / this.trackElementSize.h) 
											: 100;

	if (this.orientation === 'horizontal')
		this.handleElem.style.left = ((this._value - this._valueMin()) * maxExcursionPercent / (this._valueMax() - this._valueMin())).toString() + '%';// * (this.trackElementSize.w - this.handleSize.w);
	else
		this.handleElem.style.top = ((this._value - this._valueMin()) * maxExcursionPercent / (this._valueMax() - this._valueMin())).toString() + '%';// * (this.trackElementSize.w - this.handleSize.w);
}






















	
module.exports = Slider;