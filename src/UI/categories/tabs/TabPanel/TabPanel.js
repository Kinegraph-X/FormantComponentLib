/**
 * @abstract @constructor TabPanel
 * ComponentTabPanel inherits from this type and is a smarter implementation
 * that is able to initialize a whole application by itself
*/

const {TemplateFactory, Components} = require('formantCore');

var createTabPanelHostDef = require('src/UI/categories/tabs/TabPanel/componentDefs/TabPanelHostDef');
var createTabPanelSlotsDef = require('src/UI/categories/tabs/TabPanel/componentDefs/TabPanelSlotsDef');

var TabPanel = function(def, parentView, parent, slotsCount, slotsDef) {
//	console.log(def, parentView, parent, slotsCount, slotsDef);
	def = def || createTabPanelHostDef();
	this.slotsCount = slotsCount || this.slotsCount || 2;
	this.slotsDef = slotsDef || this.slotsDef || createTabPanelSlotsDef();
	
	// As in the majority of the components, custom styling is thought to be made via a sOverride
	this.slotsDef.headerDef.getHostDef().sWrapper = createTabPanelSlotsDef().headerDef.getHostDef().sWrapper;

	Components.CompositorComponent.call(this, def, parentView, parent);
	this.objectType = 'TabPanel';
	
	// Here, the typedSlots solely have a schema. 
	// In ComponentTabPanel, the typedSlots[1] makes this abstract class smarter :
	//  it has a cSet as "self" and a custom method (pushToSlotFromComponent()) to access it.
	this.typedSlots[0].setSchema(['headerTitle']);
	this.typedSlots[1].setSchema(['panelTitle']);
} 
TabPanel.prototype = Object.create(Components.CompositorComponent.prototype);
TabPanel.prototype.objectType = 'TabPanel';
// This Dependancy Injection mecanism is called in dependancyInjector.js (index.js requires it, and it's a mandatory include, so the DI shall be permanent)
TabPanel.prototype.extendsCore = 'LazySlottedCompoundComponent';


/**
 * No default def, as we ALWAYS need a pretty complex definition,
 * so, the ctor handles that.
 * (and thus, an override MUST be made of a complete new def,
 * based on the one provided by the component itself)
 */
//TabPanel.prototype.createDefaultDef = function() {
//	return createTabPanelHostDef();
//}

TabPanel.prototype.addTabs = function(tabName) { //tabNameX, tabNameY, ...
	this.addPairedItems.apply(this, arguments);
	this.getLastHeader().addEventListener('update', this.updateHandler.bind(this));
}

TabPanel.prototype.getHeaders = function() {
	return this._children[0];
}
TabPanel.prototype.getPanels = function() {
	return this._children[1];
}
TabPanel.prototype.getHeader = function(idx) {
	return this._children[0]._children[idx];
}
TabPanel.prototype.getLastHeader = function() {
	return this._children[0]._children[this._children[0]._children.length - 1];
}
TabPanel.prototype.getPanel = function(idx) {
	return this._children[1]._children[idx];
}
TabPanel.prototype.getLastPanel = function() {
	return this._children[1]._children[this._children[1]._children.length - 1];
}
TabPanel.prototype.getSmartTabsInPanel = function(idx) {
	return this._children[1]._children[idx]._children[0];
}
TabPanel.prototype.getSmartTabsInLastPanel = function() {
	return this._children[1]._children[this._children[1]._children.length - 1]._children[0];
}

TabPanel.prototype.updateHandler = function(e) {
	this.ignitePanel(e.data.self_key);
}

TabPanel.prototype.ignitePanel = function(idx) {
	this._children[1]._children.forEach(function(child, key) {
		if (key === idx)
			child.view.getMasterNode().style.display = 'flex';
		else
			child.view.getMasterNode().style.display = 'none';
	});
	this.getHeaders().childButtonsHighlightLoop(idx);
}


module.exports = TabPanel;