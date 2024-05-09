/**
 * @constructor GenericTitledPanelComponent
*/

const {TemplateFactory, Components, appConstants} = require('formantCore');

var createGenericTitledPanelComponentHostDef = require('src/UI/categories/basics/GenericTitledPanelComponent/componentDefs/GenericTitledPanelComponentHostDef');
//var createGenericTitledPanelComponentSlotsDef = require('src/UI/categories/basics/GenericTitledPanelComponent/componentDefs/GenericTitledPanelComponentSlotsDef');

var GenericTitledPanelComponent = function(definition, parentView, parent) {
	var def = (definition.getGroupHostDef() && definition.getGroupHostDef().type) 
		? definition 
			: createGenericTitledPanelComponentHostDef();
			
	Components.CompositorComponent.call(this, def, parentView, parent);
	this.objectType = 'GenericTitledPanelComponent';
}
GenericTitledPanelComponent.prototype = Object.create(Components.CompositorComponent.prototype);
GenericTitledPanelComponent.prototype.objectType = 'GenericTitledPanelComponent';
GenericTitledPanelComponent.prototype.extendsCore = 'CompoundComponent';

//GenericTitledPanelComponent.defaultDef = {
//	nodeName : 'div',
//	attributes : [],
//	states : [],
//	props : [],
//	reactOnParent : [],
//	reactOnSelf : []
//}

//GenericTitledPanelComponent.prototype.createDefaultDef = function() {
//	return 
//}

//GenericTitledPanelComponent.prototype.getBoundingBox = function() {
//	var self = this;
//	
//	return new Promise(function(resolve, reject) {
//		var inter = setInterval(function() {
//			if (self.view.getMasterNode()) {
//				clearInterval(inter);				
//				appConstants.resizeObserver.observe(self.view.getMasterNode(), self.storeBoundingBox.bind(self, resolve));
//			}
//		}, 512);
//	});
//}
//GenericTitledPanelComponent.prototype.storeBoundingBox = function(resolve, e) {
//	resolve(this.boundingBox = e.data.boundingBox);
//}






module.exports = GenericTitledPanelComponent;