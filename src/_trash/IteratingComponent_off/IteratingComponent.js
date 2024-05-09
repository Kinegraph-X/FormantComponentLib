/**
 * @constructor IteratingComponent
 * @author : Kinegraphx
*/

const TemplateFactory = require('src/core/TemplateFactory');
const Components = require('src/core/Component');
const CoreTypes = require('src/core/CoreTypes');
const ReactiveDataset = require('src/core/ReactiveDataset');

const createIteratingComponentHostDef = require('src/UI/categories/lists/IteratingComponent/componentDefs/IteratingComponentHostDef');
const createIteratingComponentSlotsDef = require('src/UI/categories/lists/IteratingComponent/componentDefs/IteratingComponentSlotsDef');

const IteratingComponent = function(definition, parentView, parent, slotDef) {
	// Let's allow neither passing a parentView nor a parent.
	// This is a common pattern we've used in the documentation
	// (although the standard signature for Components has 3 parameters,
	// and is useful in more complex cases)
	if (!(parentView instanceof CoreTypes.ComponentView)
		&& !(parent instanceof Components.HierarchicalObject))
			slotDef = parentView;
	
	Components.ComponentWithView.call(this, definition, parentView, parent);
	this.objectType = 'IteratingComponent';
	
	this.typedSlot = this.ReactiveDataset(
		null,										// wrapping component
		this,										// host component
		createIteratingComponentSlotsDef().slotDef,	// list-item template
		['text']									// schema of data for reactivity
	);
}
IteratingComponent.prototype = Object.create(Components.ComponentWithView.prototype);
IteratingComponent.prototype.objectType = 'IteratingComponent';

IteratingComponent.prototype.createDefaultDef = function() {
	return createIteratingComponentHostDef();
}

IteratingComponent.prototype.acquireData = function(listContentAsArray) {
	const conformedList = listContentAsArray.map(
		(item) => this.typedSlot.newItem(item)
	);
	this.typedSlot.pushApply(conformedList);
}

module.exports = IteratingComponent;