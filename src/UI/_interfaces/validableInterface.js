/**
 * @interface validableInterface
*/

const {TemplateFactory, integratedLibs, validators} = require('formantCore');
const Validate = integratedLibs.Validate;

//var validators = require('src/_buildTools/_UIpackages')(null, null).validatorList;
//for (let validator in validators) {
//	validators[validator] = require(validators[validator]);
//}


//Mnemonic (caution, more files may have been added since this example call)
//var validators = {
//		emailInput : require('src/UI/validators/emailInputDef'),
//		passwordInput : require('src/UI/validators/passwordInputDef'),
//		usernameInput : require('src/UI/validators/usernameInputDef')
//}


var inter = function() {
	this.defaultValidator;
	this.validator;
}
inter.prototype.constructor = inter;
inter.prototype.objectType = 'validableInterface';

inter.prototype.queueAsync = function(objectType) {
	return new TemplateFactory.TaskDefinition({
		type : 'viewExtend',
		task : function(definition) {
				// Set validator name depending on input name
				this.defaultValidator = definition.getHostDef().attributes.findObjectByKey('name').name + 'Input';
				this.validator = validators[this.defaultValidator];
				
				this.decorateAttrBasedOnValidators(definition);
		},
		index : 0
	});
}

inter.prototype.queueAsyncRegister = function() {
	// TODO : Optimize : using a closure on "self" may be faster than "binding" the event callback
	return new TemplateFactory.TaskDefinition({
		type : 'lateBinding',
		task : function(definition) {
				// From the MDN : "Depending on the kind of element being changed and the way the user interacts with the element, the change event fires at a different moment:
				// When the element loses focus after its value was changed: for elements where the user's interaction is typing rather than selection, such as a <textarea> or the text, search, url, tel, email, or password types of the <input> element."
				this.view.subViewsHolder.memberViews[1].getMasterNode().addEventListener('change', function(e) {
					
					var validationRes = Validate.single(e.target.value, this.validator);
//					console.log(validationRes, this.validator)
					this.streams['valid'].value = (validationRes === undefined ? true : null);
					if (e.target.name === 'username') {
						this.streams['errors'].value = [this.validator.presence.message.slice(1)];
						// TODO : CSS Fade Out here.
						this.forceShowTooltip();	// we can't update once with null, then update another time with some content : the browser is deboucing the prop changes...
					}
					else
						this.streams['errors'].value = (validationRes || null);
				}.bind(this));
				
				if(Object.keys(this.validator).length === 1 && this.validator.presence && this.validator.presence.allowEmpty === true)
					this.streams.valid.value = true;
			}
	});;
}

inter.prototype.decorateAttrBasedOnValidators = function(definition) {
	var attributes = definition.getHostDef().attributes;
	
	if (!this.validator || !this.validator.presence || this.validator.presence.allowEmpty === true) {
		attributes.findObjectByKey('placeholder').placeholder = attributes.getObjectValueByKey('placeholder').replace(/Please/, 'You may');
		attributes.findObjectByKey('label').label = attributes.getObjectValueByKey('label') + ' :';
	}
	else if (this.validator.presence && this.validator.presence.allowEmpty === false)
		attributes.findObjectByKey('label').label = attributes.getObjectValueByKey('label') + '* :';
}

module.exports = inter;