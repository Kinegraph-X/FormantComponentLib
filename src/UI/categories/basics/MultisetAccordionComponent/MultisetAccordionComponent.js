/**
 * @constructor MultisetAccordionComponent
*/

const {TemplateFactory, Components} = require('formantCore');

var createMultisetAccordionComponentHostDef = require('src/UI/categories/basics/MultisetAccordionComponent/componentDefs/MultisetAccordionComponentHostDef');
//var createMultisetAccordionComponentSlotsDef = require('src/UI/categories/basics/MultisetAccordionComponent/componentDefs/MultisetAccordionComponentSlotsDef');

var MultisetAccordionComponent = function(definition, parentView, parent, hostedTypes) {
	// Only override but don't re-assign:
	// 		when the Component is decorated, the def obj passed here as arg
	// 		may be the one that shall be used to add additionnal reactive bindings
	if (!definition.getGroupHostDef().nodeName) {
		var def = createMultisetAccordionComponentHostDef();
		definition.getGroupHostDef().nodeName = def.getGroupHostDef().nodeName;
		definition.lists = def.lists;
	}
	
	// Default to a single accordion set, so then a single typedSlot
	if (!hostedTypes)
		hostedTypes = ['ComponentWithView'];
		
//	this.setsCount = this.setsCount || setsCount || 1;
//	this.setDef = createMultisetAccordionComponentSlotsDef();
	
	// not required, as the hostedTypes are retrieved and injected by the AccordionAccordion ctor
//	this.slotsDefFactory = createMultisetAccordionComponentSlotsDef;
	
	Components.CompositorComponent.call(this, definition, parentView, parent, hostedTypes);
	this.objectType = 'MultisetAccordionComponent';
	
//	console.log(this);
}
MultisetAccordionComponent.prototype = Object.create(Components.CompositorComponent.prototype);
MultisetAccordionComponent.prototype.objectType = 'MultisetAccordionComponent';
MultisetAccordionComponent.prototype.extendsCore = 'AbstractAccordion';

//MultisetAccordionComponent.defaultDef = {
//	nodeName : 'div',
//	attributes : [],
//	states : [],
//	props : [],
//	reactOnParent : [],
//	reactOnSelf : []
//}

//MultisetAccordionComponent.prototype.createDefaultDef = function() {
//	return TypeManager.createComponentDef(
//			Object.assign(MultisetAccordionComponent.defaultDef, createMultisetAccordionComponentHostDef()),
//			'MultisetAccordionComponentDefaultDef'
//		);
//}

//MultisetAccordionComponent.prototype.acquireDatasets = function(datasetList) {
//	
//	this.typedSlots = [];
//	datasetList.forEach(function(dataset, key) {
//		var set = new Components.ComponentWithView(
//			TypeManager.createComponentDef({
//				nodeName : 'accordion-set',
//				sWrapper : createMultisetAccordionComponentHostDef().setDef.getHostDef().sWrapper
//			}),
//			this.view,
//			this
//		);
//		this.typedSlots.push(
//			new this.rDataset(
//				set,
//				set,
//				this.slotsDef,
//				[]
//			)
//		);
//
////		console.log(this.typedSlots[key]);
//		this.typedSlots[key].pushApply(dataset);
//		this.registerAccordionSetClickEvents(key);
//	}, this);
//}

MultisetAccordionComponent.prototype.registerAccordionSetClickEvents = function(accordionSetIdx) {
	// It is admitted here we shall not add panels after the first init (or use the next method)
	// component.view.subViewsHolder.memberAt(0) is <header>
	var self = this;
	this._children[accordionSetIdx]._children.forEach(function(component) {
		component.view.subViewsHolder.memberAt(0).addEventListener('mousedown', function(e) {
			component.trigger('update', {self_key : component._key, self_UID : component._UID});
		});
		component.addEventListener('update', function(e) {
			self.typedSlots[accordionSetIdx].targetContainerDeploy(e.data.self_key);
		});
	}, this);

}

MultisetAccordionComponent.prototype.registerNewPanelClickEvents = function(accordionSetIdx) {
	// Here we may handle newly added panels after the first init
	this._children[accordionSetIdx].getLastChild().view.subViewsHolder.memberAt(0).addEventListener('mousedown', function(e) {
		component.trigger('update', {self_key : this._children[accordionSetIdx].getLastChild().UID});
	});
}

module.exports = MultisetAccordionComponent;