/**
 * @constructor ComponentTabPanel
*/

//var createComponentTabPanelHostDef = require('src/UI/categories/tabs/ComponentTabPanel/componentDefs/ComponentTabPanelHostDef');
//var createComponentTabPanelSlotsDef = require('src/UI/categories/tabs/ComponentTabPanel/componentDefs//ComponentTabPanelSlotsDef');

//const {Components} = require('formantCore');
var TabPanel = require('src/UI/categories/tabs/TabPanel/TabPanel');

var ComponentTabPanel = function(definition, parentView, parent, slotsCount, slotsDef) {
	TabPanel.call(this, definition, parentView, parent, slotsCount, slotsDef);
	this.objectType = 'ComponentTabPanel';
}
ComponentTabPanel.prototype = Object.create(TabPanel.prototype);
ComponentTabPanel.prototype.objectType = 'ComponentTabPanel';
ComponentTabPanel.prototype.extends = 'TabPanel';


ComponentTabPanel.prototype.affectSlots = function() {
	this.typedSlots.push(new this.rDataset(
			this._children[0],
			this._children[0],
			this.slotsDef['headerDef'],
			[])
		);
	
	this.typedSlots.push(new this.cSet(this._children[1], this.slotsDef['sectionDef']));
	
	return true;
}


ComponentTabPanel.prototype.affectSlot = function(slotNumber, slotDef) {
	this.typedSlots[slotNumber] = new this.cSet(this._children[slotNumber], slotDef);
	this._children[slotNumber].view.styleHook.s = slotDef.getHostDef().sWrapper.clone();
}

ComponentTabPanel.prototype.pushToSlotFromComponent = function(routerObj, routerKeyword) {
	this.typedSlots[1].push(this.typedSlots[1].newItem(routerObj, routerKeyword));
}

ComponentTabPanel.prototype.addTabForComponent = function(headerText, routerObj, routerKeyword) {
	this.pushToSlotFromText(0, headerText);
	this.pushToSlotFromComponent(routerObj, routerKeyword || '');
	
	this.getLastHeader().addEventListener('update', this.updateHandler.bind(this));
	return this;
}

ComponentTabPanel.prototype.updateHandler = function(e) {
	this.ignitePanel(e.data.self_key);
}

ComponentTabPanel.prototype.ignitePanel = function(idx) {
	this.typedSlots[1].ignite(idx);
	this.getHeaders().childButtonsHighlightLoop(idx);
}



module.exports = ComponentTabPanel;