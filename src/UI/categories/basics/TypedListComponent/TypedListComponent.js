/**
 * @constructor TypedListComponent
*/

const {TemplateFactory, Components} = require('formantCore');

var createTypedListComponentHostDef = require('src/UI/categories/basics/TypedListComponent/componentDefs/TypedListComponentHostDef');
var createTypedListComponentSlotsDef = require('src/UI/categories/basics/TypedListComponent/componentDefs/TypedListComponentSlotsDef');

var TypedListComponent = function(definition, parentView, parent) {
	var stdDef = definition || createTypedListComponentHostDef();
	this.slotsDef = this.slotsDef || createTypedListComponentSlotsDef();
	this.slotsCount = 1;
	
	Components.CompositorComponent.call(this, stdDef, parentView, parent);
	this.objectType = 'TypedListComponent';
	
//	console.log(this);
}
TypedListComponent.prototype = Object.create(Components.CompositorComponent.prototype);
TypedListComponent.prototype.objectType = 'TypedListComponent';
TypedListComponent.prototype.extendsCore = 'LazySlottedCompoundComponent';

//TypedListComponent.defaultDef = {
//	nodeName : 'typed-list',
//	attributes : [],
//	states : [],
//	props : [],
//	reactOnParent : [],
//	reactOnSelf : []
//}
//
//TypedListComponent.prototype.createDefaultDef = function() {
//	return TypeManager.createComponentDef(
//			createTypedListComponentHostDef(),
//			'TypedListComponentDefaultDef',
//			'rootOnly'
//		);
//}



/**
 * @overrride
 */
TypedListComponent.prototype.updateDefinitionBasedOnSlotsCount = function(definition) {
	
}


/**
 * @overrride
 */
TypedListComponent.prototype.affectSlots = function() {
	var i = 0;
//	console.log(this);
	for (let slotDef in this.slotsDef) {
		this.typedSlots.push(new this.rDataset(
			this,
			this,
			this.slotsDef[slotDef],
			[])
		);
		i++;
	}

	return true;
}












module.exports = TypedListComponent;