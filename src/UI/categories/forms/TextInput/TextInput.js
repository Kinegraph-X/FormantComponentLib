/**
 * @constructor TextInput
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
 * [PATCH METHOD REMAINS:eventual testing purpose]
 */


const {TemplateFactory, Registries, Components} = require('formantCore');
const VisibleStateComponent = require('src/UI/categories/basics/VisibleStateComponent/VisibleStateComponent');
const Tooltip = require('src/UI/categories/basics/Tooltip/Tooltip');

const labelledTextInputInterface = require('src/UI/_interfaces/labelledTextInputInterface');
const typedInputInterface = require('src/UI/_interfaces/typedInputInterface');
const validableInterface = require('src/UI/_interfaces/validableInterface');
const locallySavableInputInterface = require('src/UI/_interfaces/locallySavableInputInterface');

const createTextInputDef = require('src/UI/categories/forms/TextInput/componentDefs/textInputDef');

/**
 * @constructor TextInput
 * 
 */
let TextInput = function(definition, parentView, parent) {
	this.defaultValidator = 'textInput';
	this.savableStore = (definition.options && definition.options.savableStore) ? definition.options.savableStore : null;
	
	Components.ComponentStrokeAware.call(this, definition, parentView, parent);
	this.objectType = 'TextInput';
	
	
}
/**
 * @chained_inheritance TextInput <= VisibleStateComponent <= ComponentStrokeAware
 */
var proto_proto = Object.create(Components.ComponentStrokeAware.prototype);
Object.assign(proto_proto, VisibleStateComponent.prototype);
TextInput.prototype = Object.create(proto_proto);TextInput.prototype.objectType = 'TextInput';

/**
 * @interfaces_implementation
 */
TextInput = Components.ExtensibleObject.prototype.addInterface(TextInput, labelledTextInputInterface);
TextInput = Components.ExtensibleObject.prototype.addInterface(TextInput, typedInputInterface);
TextInput = Components.ExtensibleObject.prototype.addInterface(TextInput, validableInterface);
TextInput = Components.ExtensibleObject.prototype.addInterface(TextInput, locallySavableInputInterface);
/**
 * We need a Tooltip. Here is the Tooltip.
 * Here we have something as cool from the point of view of the functionality, as from the "didactical" point of view:
 * Instanciating a Component in an interface appears as weird as getting back to the dining room at dinner-time,
 * proposing to your guests a "dinner on plates" after having served the dishes roughly on the wood of the table.
 * But after having implemented a whole lot of interfaces, adding another task to the queue
 * seems to be the way to follow on the incremental extension. 
 */
TextInput.prototype._asyncInitTasks.push(new TemplateFactory.TaskDefinition({
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
TextInput.prototype.createDefaultDef = function() {
	
	return TemplateFactory.createHostDef({
			nodeName : 'smart-input',
			sWrapper : createTextInputDef().getHostDef().sWrapper,
			states : [
				{valid : undefined},
				{errors : undefined}
			]
		}, null);
}

/**
 * @implementation {pure_virtual_on_abstract_type} {chained_inherited_implementation}
 */
TextInput.prototype.createEvents = function() {
	VisibleStateComponent.prototype.createEvents.call(this);
	Components.ComponentStrokeAware.prototype.createEvents.call(this);
	this.createEvent('return_key');
}

/**
 * @inherited_implementation_override
 */
TextInput.prototype.registerClickEvents = function() {}

/**
 * @implementation {pure_virtual_on_abstract_type}
 */
TextInput.prototype.registerKeyboardEvents = function(e) {
	Components.ComponentStrokeAware.prototype.registerKeyboardEvents.call(this);
	
	var self = this,
		input = this.view.subViewsHolder.memberViews[1];
//	console.warn('TextInput :', 'where is "input"', input);
	
	// Stroke event listener & canAct management 
	input.getMasterNode().addEventListener('keyup', function(e) {
		e.stopPropagation();
		// allow triggering command by pressing "return" key
		if (e.keyCode === 13) {
			self.trigger('update', self.getValue());
			
			if (!self.command)
				return;
			
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

TextInput.prototype.getName = function() {
	return Registries.hostsDefinitionsCacheRegistry.cache[this._defUID].getHostDef().attributes.getObjectValueByKey('name');
}

TextInput.prototype.getValue = function() {
	return this.view.subViewsHolder.memberViews[1].getMasterNode().value;
}

TextInput.prototype.setValue = function(value) {
	this.view.subViewsHolder.memberViews[1].getMasterNode().value = value;
}

/**
 * Hack due to the browser debouncing the attribute change (how ? needs investigation): 
 * 		"hidden" is first set to true, as it reflects the "valid" state,
 * 		and then setting it to null from the "errors" stream has no effect 
 * 		TODO: check what happens in the stream, could come from a setAttribute / removeAttribute conflict
 * 		seems forcing the attribute's value is better handled
 */
TextInput.prototype.forceShowTooltip = function() {
	this.view.subViewsHolder.lastMember().getMasterNode().hidden = null;
}


module.exports = TextInput;