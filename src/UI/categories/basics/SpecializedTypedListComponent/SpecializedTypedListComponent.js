/**
 * @constructor SpecializedTypedListComponent
*/

const {TemplateFactory} = require('formantCore');

var TypedListComponent = require('src/UI/categories/basics/TypedListComponent/TypedListComponent');

var createSpecializedTypedListComponentHostDef = require('src/UI/categories/basics/SpecializedTypedListComponent/componentDefs/SpecializedTypedListComponentHostDef');
var createSpecializedTypedListComponentSlotsDef = require('src/UI/categories/basics/SpecializedTypedListComponent/componentDefs/SpecializedTypedListComponentSlotsDef');

var SpecializedTypedListComponent = function(definition, parentView, parent) {
	this.listItemNodeName = this.listItemNodeName || '';
	this.listItemMembersCount = this.listItemMembersCount || 0;
	this.listItemMemberType = this.listItemMemberType || '';
	
	this.slotsDefFactory = this.slotsDefFactory || createSpecializedTypedListComponentSlotsDef;
	
	TypedListComponent.call(this, definition, parentView, parent);
	this.objectType = 'SpecializedTypedListComponent';
	
	// Those props are not writable...
//	this.typedSlots[0].push = this.membersCountAwarePushMethod.bind(this.typedSlots[0]);
//	this.typedSlots[0].pushApply = this.membersCountAwarePushApplyMethod.bind(this.typedSlots[0]);
	
	this.typedSlots[0].setSchema(['updateChannel']);
	
	if (this.listItemNodeName && this.listItemMembersCount)
		this.defineSlotHost();
	if (this.listItemMemberType || this.listItemNodeName)
		this.defineSlotMembers();
}
SpecializedTypedListComponent.prototype = Object.create(TypedListComponent.prototype);
SpecializedTypedListComponent.prototype.objectType = 'SpecializedTypedListComponent';
SpecializedTypedListComponent.prototype.extends = 'TypedListComponent';

//SpecializedTypedListComponent.defaultDef = {
//	nodeName : 'div',
//	attributes : [],
//	states : [],
//	props : [],
//	reactOnParent : [],
//	reactOnSelf : []
//}

SpecializedTypedListComponent.prototype.createDefaultDef = function() {
	return createSpecializedTypedListComponentHostDef().getHostDef();
}

SpecializedTypedListComponent.prototype.membersCountAwarePushMethod = function(item) {
	if (!Array.isArray(item.updateChannel)) {
		console.warn(this.rootComponent.objectType, 'typedSlots[0] (ReactiveDataset)', 'pushed item has no "updateChannel" prop or the prop value is not of type Array.', item, 'Returning...');
		return;
	}
	var membersCount = item.updateChannel.length;
	this.rootComponent.updateMembersCount(membersCount);
	Object.getPrototypeOf(this).push.call(this, item);
}

SpecializedTypedListComponent.prototype.membersCountAwarePushApplyMethod = function(itemList) {
	itemList.forEach(function(item) {
		this.push(item);
		console.log(item);
	}, this);
}

SpecializedTypedListComponent.prototype.defineSlotHost = function() {
	this.typedSlots[0].defaultListDef.getHostDef().template = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
			type : 'CompoundComponent',
			nodeName : this.listItemNodeName,
			props : [
				{updateChannel : undefined}
			]
//			,
//			reactOnSelf : [
//					{
//						from :  'updateChannel',
//						cbOnly : true,
//						subscribe : function(val) {
////							console.log(val);
//						}
//					}
//			]
		})
	});
}

SpecializedTypedListComponent.prototype.defineSlotMembers = function() {
	var membersDef = this.typedSlots[0].defaultListDef.getHostDef().template.members = [];
	
	// This loop may be defined in the factory function defined as this.slotsDefFactory
	for (let i = 0; i < this.listItemMembersCount; i++) {
		membersDef.push(
			TypeManager.createComponentDef({
				type : this.listItemMemberType,
				reactOnParent : [
					{
						from : 'updateChannel',
						to : 'updateChannel'
					}
				]
			})
		);
	}
}

SpecializedTypedListComponent.prototype.updateMembersCount = function(membersCount) {
	this.listItemMembersCount = membersCount;
	this.defineSlotMembers();
}

module.exports = SpecializedTypedListComponent;