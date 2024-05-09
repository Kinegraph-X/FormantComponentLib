/**
 * @constructor TextareaInput
 * 
 * This type is a good example of a high-level component (formal layer).
 * More than a starting point, it's a quite complete implementation.
 * It exposes the most part of the core functionalities, and it develops progressively.
 * Nevertheless, it's not ready-to-go yet.
 * At this extension stage, a component can implement a rich typology (a default "geography"
 * of views and states), and a lot of applicative behaviors.
 * It acquires its functionnalities through inheritance from rich abstract types  
 * that already abstract some behaviors, it may acquire concrete behaviors from 
 * some generic-implementations and eventually decorate itself through interfaces.
 * Here's also a good place to register itself in the render queue, and then have its listeners
 * attached to user-events.
 * But, as said, it still needs a few more key-specializations.
 * It's a rich base-class that is ideal for a concise-and-clear specialization.
 * 
 * [FIXED:not related to an unintented reference (the cause was an unintented cascade of merge in TemplateFactory.Single...streams)]
 * ***the main risk at this stage being that the decorators (aka. here "interfaces")
 * ***mutate the default definition.
 * ***The specialized type must at least take care of this potential break (see e.g. UsernameInput).
 * [PATCH METHOD REMAINS: eventual testing purpose]
 */


const {TemplateFactory, Registries, Components} = require('formantCore');

const VisibleStateComponent = require('src/UI/categories/basics/VisibleStateComponent/VisibleStateComponent');
const Tooltip = require('src/UI/categories/basics/Tooltip/Tooltip');

const labelledTextareaInputInterface = require('src/UI/_interfaces/labelledTextareaInputInterface');
const validableInterface = require('src/UI/_interfaces/validableInterface');

const createTextareaInputDef = require('src/UI/categories/forms/TextInput/componentDefs/textInputDef');

/**
 * @constructor TextareaInput
 * This type is not inheriting from TextInput cause it must not implement all the interfaces
 * => it  has implications in the FormComponent when retrieving data (we test 2 cases of instanceof)
 */
var TextareaInput = function(def, parentView, parent) {
	this.defaultValidator = 'textInput';
	
	Components.ComponentStrokeAware.call(this, def, parentView, parent);
	this.objectType = 'TextareaInput';
	
	
}
/**
 * @chained_inheritance TextareaInput <= VisibleStateComponent <= ComponentStrokeAware
 */
var proto_proto = Object.create(Components.ComponentStrokeAware.prototype);
Object.assign(proto_proto, VisibleStateComponent.prototype);
TextareaInput.prototype = Object.create(proto_proto);TextareaInput.prototype.objectType = 'TextareaInput';

/**
 * @interfaces_implementation
 */
TextareaInput = Components.ExtensibleObject.prototype.addInterface(TextareaInput, labelledTextareaInputInterface);
//TextareaInput = Components.ExtensibleObject.prototype.addInterface(TextareaInput, typedInputInterface);
TextareaInput = Components.ExtensibleObject.prototype.addInterface(TextareaInput, validableInterface);
/**
 * We need a Tooltip. Here is the Tooltip.
 * Here we have something as cool from the point of view of the functionality, as from the "didactical" point of view:
 */
TextareaInput.prototype._asyncInitTasks.push(new TemplateFactory.TaskDefinition({
	type : 'lateAddChild',
	task : function(definition) {
			var basicDef = TemplateFactory.createHostDef({type : 'emptyDef'});
			new Tooltip(basicDef, this.view, this);
			this.view.subViewsHolder.addMemberView(this._children[this._children.length - 1].view);
		}
	})
);

/**
 * @implementation {optional} {default_implementation_on_abstract_type}
 */
TextareaInput.prototype.createDefaultDef = function() {
	const dummyDef = createTextareaInputDef().getHostDef();
	const def = TemplateFactory.createHostDef({
		nodeName : 'smart-input',
		sWrapper : dummyDef.sWrapper,
		states : [
			{valid : undefined},
			{errors : undefined}
		]
	}, null);
	return def;
}

/**
 * @implementation {pure_virtual_on_abstract_type} {chained_inherited_implementation}
 */
TextareaInput.prototype.createEvents = function() {
	VisibleStateComponent.prototype.createEvents.call(this);
	Components.ComponentStrokeAware.prototype.createEvents.call(this);
	this.createEvent('return_key');
}

/**
 * @inherited_implementation_override
 */
TextareaInput.prototype.registerClickEvents = function() {}

/**
 * @implementation {pure_virtual_on_abstract_type}
 */
TextareaInput.prototype.registerKeyboardEvents = function(e) {
	Components.ComponentStrokeAware.prototype.registerKeyboardEvents.call(this);
	var self = this,
		input = this.view.subViewsHolder.memberViews[1];
//	console.warn('TextareaInput :', 'where is "input"', input);
	
	// Stroke event listener & canAct management 
	input.getMasterNode().addEventListener('keyup', function(e) {
		e.stopPropagation();
		
		// allow triggering command by pressing "return" key
		if (e.keyCode === 13) {
			if (self.command.act !== null) {
				var canActQuery = self.command.act();
				canActQuery.then(
					function(queryResult) {
						self.trigger('return', input.val());
					},
					function(queryResult) {
						self.view.getMasterNode()['disable'] = true;
						setTimeout(function() {
							self.view.getMasterNode()['disable'] = false;
						}, 255)
					}
				);
			}
			else
				self.trigger('return', input.val());
		}
	});
}

TextareaInput.prototype.getName = function() {
	return Registries.hostsDefinitionsCacheRegistry.cache[this._defUID].getHostDef().attributes.getObjectValueByKey('name');
}

TextareaInput.prototype.getValue = function() {
	return this.view.subViewsHolder.memberViews[1].getMasterNode().value;
}

TextareaInput.prototype.setValue = function(value) {
	this.view.subViewsHolder.memberViews[1].getMasterNode().value = value;
}

/**
 * Hack due to the browser debouncing the attribute change (triggered on focus lost): 
 * 		"hidden" is first set to true, as it reflects the "valid" state,
 * 		and then setting it to null from the "errors" stream has no effect 
 * 		TODO: check what happens in the stream, could come from a setAttribute / removeAttribute conflict
 * 		seems forcing the attribute's value is better handled
 */
TextareaInput.prototype.forceShowTooltip = function() {
	this.view.subViewsHolder.lastMember().getMasterNode().hidden = null;
}

TextareaInput.prototype.setTooltipContentAndShow = function(content) {
	this.streams['errors'].value = ['', content];
	this.view.subViewsHolder.lastMember().getMasterNode().hidden = null;
}


module.exports = TextareaInput;