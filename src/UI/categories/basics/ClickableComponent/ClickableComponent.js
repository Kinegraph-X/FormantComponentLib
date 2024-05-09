/**
 * @constructor ClickableComponent
 * @author : Kinegraphx
*/

const {TemplateFactory, Components} = require('formantCore');

//var createClickableComponentHostDef = require('src/UI/categories/_recentlyCreated/ClickableComponent/componentDefs/ClickableComponentHostDef');
//var createClickableComponentSlotsDef = require('src/UI/categories/_recentlyCreated/ClickableComponent/componentDefs/ClickableComponentSlotsDef');

const ClickableComponent = function(definition, parentView, parent) {
	Components.CompositorComponent.call(this, definition, parentView, parent);
	this.objectType = 'ClickableComponent';
}
ClickableComponent.prototype = Object.create(Components.CompositorComponent.prototype);
ClickableComponent.prototype.objectType = 'ClickableComponent';
ClickableComponent.prototype.extendsCore = 'CompoundComponentWithHooks';

//ClickableComponent.defaultDef = {
//	nodeName : 'div',
//	attributes : [],
//	states : [],
//	props : [],
//	reactOnParent : [],
//	reactOnSelf : []
//}

ClickableComponent.prototype.createDefaultDef = function() {
//	return createClickableComponentHostDef();
}

ClickableComponent.prototype.createEvents = function() {
//	console.log('createEvents');
	this.createEvent('clicked_ok');
	this.createEvent('dblClicked_ok');
	this.createEvent('clicked_refused');
}

ClickableComponent.prototype.registerClickEvents = function() {
//	console.log('registerClickEvents');
	// Click event listener & canAct management
	this.eventPayload = {
		originalEvent : new Event('mouseDown'),		// Dummy val => TODO: benchmark this on huge lists 
												// (we could have set it to null, but we thought avoiding realocation could improve perfs)
		self : this
	};
	this.clickHandler = this.handleClickEvent.bind(this);
	this.dblClickHandler = this.handledDblClickEvent.bind(this);
	this.view.getMasterNode().addEventListener('mousedown', this.clickHandler);
	this.view.getMasterNode().addEventListener('dblclick', this.dblClickHandler);
}

ClickableComponent.prototype.handleClickEvent = function(e) {
	var self = this;
	
	e.stopPropagation();
	
	if (self.command && self.command.act !== null)
		var canActQuery = self.command.act();
	else {
		this.eventPayload.originalEvent = e;
		self.trigger('clicked_ok', this.eventPayload);
		return;
	}
	
	canActQuery.then(
		function(queryResult) {
			self.trigger('clicked_ok', self.eventPayload);
		},
		function(queryResult) {
			self.view.getMasterNode()['disabled'] = 'disabled';
			setTimeout(function() {
				self.view.getMasterNode()['disabled'] = null;
			}, 255)
			self.trigger('clicked_refused', self.eventPayload);
		}
	);
}

ClickableComponent.prototype.handledDblClickEvent = function(e) {
	var self = this;
	e.stopPropagation();
	
	if (self.command && self.command.act !== null)
		var canActQuery = self.command.act();
	else {
		this.eventPayload.originalEvent = e;
		self.trigger('dblClicked_ok', this.eventPayload);
		return;
	}
	
	canActQuery.then(
		function(queryResult) {
			self.trigger('dblClicked_ok', this.eventPayload);
		},
		function(queryResult) {
			self.view.getMasterNode()['disabled'] = 'disabled';
			setTimeout(function() {
				self.view.getMasterNode()['disabled'] = null;
			}, 255)
			self.trigger('clicked_refused', this.eventPayload);
		}
	);
}

module.exports = ClickableComponent;