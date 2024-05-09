/**
* @constructor visibleStateComponent
*/


const {TemplateFactory, CoreTypes, Components} = require('formantCore');

var AGDef = require('src/UI/categories/_configurationFiles/_arias&glyphsDef');

var visibleStateComponent = function(def, containerDOMId, automakeable) {
	Components.ComponentWithReactiveText.apply(this, arguments);
	this.objectType = 'VisibleStateComponent';
}

visibleStateComponent.prototype = Object.create(Components.ComponentWithReactiveText.prototype);visibleStateComponent.prototype.objectType = 'VisibleStateComponent';

visibleStateComponent.prototype.createDefaultDef = function(componentDef) {
	var def = TemplateFactory.createHostDef({
			props : [
//				{text : undefined}
				{content : undefined}
			],
			reactOnSelf : [
				{to : 'content', cbOnly : true, subscribe : this.appendContentFromValueOnView},
				{from : 'text', to : 'content'},
			]
	});
	
	// SAME AS IN SIMPLE TEXT
	// Sort of a Hack, to reduce the risk of errors for the user:
	// In case of a component choosing not to define a "text"" prop
	// but rather, for example, reactOnParent directly to "content"
	if (!componentDef.getHostDef().props.hasObjectByKey('text')) {
		var textProp = new TypeManager.propsModel({text : undefined});
		def.getHostDef().props.push(textProp);
		def.getHostDef().streams.push(textProp);
	}
	
	return def;
}

visibleStateComponent.prototype.createEvents = function() {
	this.createEvent('clicked_ok');
	this.createEvent('dblClicked_ok');
	this.createEvent('clicked_refused');
}

visibleStateComponent.prototype.basicLateViewExtend = function(definition) {
	var glyphDef = AGDef.getGlyphs(this.__proto__.objectType);
	if (glyphDef === null)
		return;

	var state;
	
	var nodeDef = TypeManager.createComponentDef({
		nodeName : 'span',
		attributes : [
			{hidden : 'hidden'},
			{className : null}
		]
	});
	
	for (let glyphName in glyphDef) {
		state = glyphName.slice(5).toLowerCase();				// glyphSomething
		if (state in CoreTypes.commonStates) {
			nodeDef.getHostDef().attributes[1].className = 'glyphicon ' + glyphDef[glyphName];
			this.addReactiveMemberViewFromFreshDef(definition, nodeDef, state);
		}
		state = glyphName.slice(8);								// glyphNotsomething
		if (state in CoreTypes.commonStates) {
			nodeDef.getHostDef().attributes[1].className = 'glyphicon ' + glyphDef[glyphName]; 
			this.addReactiveMemberViewFromFreshDef(definition, nodeDef, 'Not' + state);
		}
	}
}


visibleStateComponent.prototype.registerClickEvents = function() {
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

visibleStateComponent.prototype.handleClickEvent = function(e) {
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

visibleStateComponent.prototype.handledDblClickEvent = function(e) {
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


module.exports = visibleStateComponent;
