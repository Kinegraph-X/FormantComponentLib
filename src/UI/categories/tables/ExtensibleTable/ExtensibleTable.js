/**
 * @constructor ExtensibleTable
*/

const {TemplateFactory, Components} = require('formantCore');
const SpinnerComponent = require('src/UI/categories/utilities/SpinnerComponent/SpinnerComponent');

const createExtensibleTableDef = require('src/UI/categories/tables/ExtensibleTable/componentDefs/extensibleTableDef');
const createExtensibleTableSlotsDef = require('src/UI/categories/tables/ExtensibleTable/componentDefs/extensibleTableSlotsDef');


const ExtensibleTable = function(def, parentView, parent, slotsCount, slotsDef) {
	var stdDefinition = def && def.getGroupHostDef().nodeName ? def : createExtensibleTableDef();
	this.slotsDef = createExtensibleTableSlotsDef();

	this.listTemplate = TemplateFactory.createDef({ type: 'ComponentList' });
	this.listTemplate.getHostDef().each = this.pseudoModel;
	
	Components.CompositorComponent.call(this, stdDefinition, parentView, parent, slotsCount, slotsDef);
	this.pseudoModel = [];
	this.objectType = 'ExtensibleTable';
}
ExtensibleTable.prototype = Object.create(Components.CompositorComponent.prototype);
ExtensibleTable.prototype.objectType = 'ExtensibleTable';
ExtensibleTable.prototype.extendsCore = 'AbstractTable';

ExtensibleTable.prototype._asyncInitTasks = [];
ExtensibleTable.prototype._asyncInitTasks.push(new TemplateFactory.TaskDefinition({
	type : 'lateAddChild',
	task : function(definition) {
//			var basicDef = TemplateFactory.createDef({type : 'emptyDef'}, 'SpinnerUsedByExtensibleTable');
//			this.pushChild(new SpinnerComponent(basicDef, this.view, this));
//			this.view.subViewsHolder.addMemberView(this._children[this._children.length - 1].view);
		}
	})
);

ExtensibleTable.prototype.pushToSlotFromText = function(slotNbr, content) {
	// Here, newItem() depends on the type given in the ctor... or afterwards with setSchema()
	this.typedSlots[slotNbr].push(this.typedSlots[slotNbr].newItem(content));
	
	if (slotNbr === 0) {
		var lastChild = this._children[0].getLastChild();
		lastChild.getMasterNode().addEventListener('mousedown', function(e) {
			this.trigger('header_clicked', {self_key : lastChild._key});
			this.typedSlots[1].sortForPropHostingArrayOnArrayIdx('rowContentAsArray', lastChild._key, lastChild.streams.sortedasc.value ? 'invert' : null);
			this._children[0].childButtonsSortedLoop(lastChild._key, lastChild.streams.sortedasc.value ? 'desc' : 'asc');
		}.bind(this));
	}
}

ExtensibleTable.prototype.pushApplyToSlot = function(slotNbr, contentAsArray) {
	var lastChildIndex = this._children[0]._children.length;
	
	// Here, newItem() depends on the type given in the ctor... or afterwards with setSchema()
	var cAsArray = contentAsArray.map(function(value, key) {
		if (value instanceof this.typedSlots[1].Item)
			return value;
		else if (Array.isArray(value) || typeof value === 'string')
			return this.typedSlots[slotNbr].newItem(value);
		else if (Object.getPrototypeOf(value) === Object.prototype) {
			const values = Object.values(value);
			return this.typedSlots[slotNbr].newItem(values);
		}
	}, this);
	
	this.typedSlots[slotNbr].pushApply(cAsArray);
	
	if (slotNbr === 0) {
		for (let i = lastChildIndex; i < this._children[0]._children.length; i++) {
			this._children[0]._children[i].view.getMasterNode().addEventListener('mousedown', function(e) {
				this.trigger('header_clicked', {self_key : this._children[0]._children[i]._key});
				this.typedSlots[1].sortForPropHostingArrayOnArrayIdx('rowContentAsArray', this._children[0]._children[i]._key, this._children[0]._children[i].streams.sortedasc.value ? 'invert' : null);
				this._children[0].childButtonsSortedLoop(this._children[0]._children[i]._key, this._children[0]._children[i].streams.sortedasc.value ? 'desc' : 'asc');
			}.bind(this));
		}
	}
}

ExtensibleTable.prototype.addHeaders = function(contentAsArray) {
	this.pushApplyToSlot(0, contentAsArray);
}

ExtensibleTable.prototype.acquireData  = function(dataAsArrayOfObjects) {
	this.pushApplyToSlot(1, dataAsArrayOfObjects);
}
	

module.exports = ExtensibleTable;
