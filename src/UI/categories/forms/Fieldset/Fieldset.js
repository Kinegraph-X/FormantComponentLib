/**
 * @constructor Fieldset
*/

//var TemplateFactory = require('src/core/TemplateFactory');
const {TemplateFactory, Components} = require('formantCore');

var createFieldsetDef = require('src/UI/categories/forms/Fieldset/componentDefs/FieldsetDef');

var Fieldset = function(definition, parentView, parent) {
	// This component may be a group or autonomous
	var hostDef = definition.getGroupHostDef() || definition.getHostDef();
	if (!hostDef.props.findObjectByKey('slotsTextContent'))
		hostDef.props.push({slotsTextContent : undefined});
		
	Components.CompositorComponent.call(this, definition, parentView, parent);
	this.objectType = 'Fieldset';
}
Fieldset.prototype = Object.create(Components.CompositorComponent.prototype);
Fieldset.prototype.objectType = 'Fieldset';
Fieldset.prototype.extendsCore = 'CompoundComponentWithReactiveText';

Fieldset.prototype.createDefaultDef = function() {
	return createFieldsetDef();
}

module.exports = Fieldset;