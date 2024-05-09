/**
 * @constructor FormComponent
 * 
*/


const {TemplateFactory, Components, integratedLibs} = require('formantCore');
const md5 = integratedLibs.md5;
const TextInput = require('src/UI/categories/forms/TextInput/TextInput');
const TextareaInput = require('src/UI/categories/forms/TextareaInput/TextareaInput');
const Fieldset = require('src/UI/categories/forms/Fieldset/Fieldset');


const createFormComponentDef = require('src/UI/categories/forms/FormComponent/componentDefs/formComponentHostDef');
	
var FormComponent = function() {
	Components.CompositorComponent.apply(this, arguments);
	this.objectType = 'FormComponent';
	this.data;
	this.isValid = true;
}
FormComponent.prototype = Object.create(Components.CompositorComponent.prototype);
FormComponent.prototype.objectType = 'FormComponent';
FormComponent.prototype.extendsCore = 'CompoundComponentWithHooks';

FormComponent.prototype.createEvents = function() {
	this.createEvent('submit');
	this.createEvent('success');
	this.createEvent('cancel');
	this.createEvent('acknowledged');
}

FormComponent.prototype.createDefaultDef = function() {
	return createFormComponentDef();
}

FormComponent.prototype.afterRegisterEvents = function() {
	this.onsubmit = this.getFormData.bind(this);	// "this" scope defaults to the _eventHandlers array, so we have to set it explicitly here :
													// we can't set it in the factory : the scope may be set by anyone who wants to define a specific scope
	// let's allow not pointing toward an API endpoint
	// => automatic sending of the form is triggered only when the form's "action" is defined
	if (this.streams.action) {
		this.onsubmit = this.sendFormData.bind(this);
	}
}

FormComponent.prototype.getFormData = function(e) {
	this.isValid = true;
	var name,
		value,
		inputs = this._children.reduce(function(aggregator, child) {
			if (!child._children.length)
				return aggregator;

			if (child instanceof TextInput || child instanceof TextareaInput)
				aggregator.push(child);
			else if (child instanceof Fieldset) {
				child._children.forEach(function(potentialInput) {
					if (potentialInput instanceof TextInput || potentialInput instanceof TextareaInput) {
						aggregator.push(potentialInput);
					}
				})	
			} 
			// Temporarily handle that way the case of a "select" component,
			// and see while using it if we need a better solution
			else if (child._children[1].objectType.match(/selector/i)) {
				if (child._children[1]._children[0] instanceof TextInput || child._children[1]._children[0] instanceof TextareaInput)
					aggregator.push(child._children[1]._children[0]);
			}
			return aggregator;
		}, []);
	
	if (!inputs.length) {
		console.warn(this.objectType, 'no inputs to get data from');
		return;
	}
	
	this.data = new FormData();
	inputs.forEach(function(field) {
		if (!this.isValid)
			return;
		if (field.handleValidation && field.namedEW) {
			field.handleValidation({target : field.namedEW[0]});
		}
		if (field.streams.valid && field.streams.valid.value !== true) {
			field.streams.valid.value = null;	// force visual feedback of the validation (the user may submit before having typed anything)
			console.warn('field validation error when sending Form to server. State is : ', field.streams.valid.value, field.objectType);
			this.isValid = false;
			return;
		}
		
		name = field.getName(), value = field.getValue();
		if (name && value) {
			// let's assume that all of the API's we're gonna target shall expect a hashed password
			if (name.match(/password/) !== null) {
				 this.data.set(name, md5(field.getValue()));
			}
			else
				this.data.set(name, field.getValue());
		}
		else if (!value) {
			// tooltip.show('vous devez sélectionner un fichier)
		}
	}, this);
	
//	console.log(isValid, [...this.data.entries()]);
}

FormComponent.prototype.sendFormData = function(e) {
	if (!this.isValid)
		return;
	else
		this.trigger('success');
		
	var options = {
		method : 'POST',
		body : JSON.stringify(Object.fromEntries(this.data.entries())),
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	}
	var self = this;
	fetch(this.streams.action.value, options).then(function(response) {
		response.text().then(function(content) {
			self.trigger('acknowledged', content);
		});
	});
}
	
module.exports = FormComponent;