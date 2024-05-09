/**
 * @constructor _componentName
 * @author : _authorName
*/

const {TemplateFactory, Components} = require('formantCore');

//var create_componentNameHostDef = require('src/UI/categories/_recentlyCreated/_componentName/componentDefs/_componentNameHostDef');
//var create_componentNameSlotsDef = require('src/UI/categories/_recentlyCreated/_componentName/componentDefs/_componentNameSlotsDef');

const _componentName = function(definition, parentView, parent) {
	Components.ComponentWithView.call(this, definition, parentView, parent);
	this.objectType = '_componentName';
}
_componentName.prototype = Object.create(Components.ComponentWithView.prototype);
_componentName.prototype.objectType = '_componentName';

//_componentName.defaultDef = {
//	nodeName : 'div',
//	attributes : [],
//	states : [],
//	props : [],
//	reactOnParent : [],
//	reactOnSelf : []
//}

_componentName.prototype.createDefaultDef = function() {
//	return create_componentNameHostDef();
}

module.exports = _componentName;