/**
 * @constructor InnerReactiveComponent
 * This is an abstract implementation
*/


const {TemplateFactory, Components} = require('formantCore');



var EachOnTheBeachComponent = function(definition, parentView, parent) {
	Components.ComponentWithReactiveText.call(this, definition, parentView, parent);
	this.objectType = 'EachOnTheBeachComponent';
}
EachOnTheBeachComponent.prototype = Object.create(Components.ComponentWithReactiveText.prototype);
EachOnTheBeachComponent.prototype.objectType = 'EachOnTheBeachComponent';

EachOnTheBeachComponent.prototype.createDefaultDef = function() {
	// The "contentToList/errors/what you want" stream only calls a callback : this.updateTargetView, and pass it the array of nodes to create and append to the declared "slot"
	return TemplateFactory.createHostDef({
		UID : 'ZZ',
		templateNodeName : 'p',
		targetSlotIndex : 1,
		reactOnParent : [
			{
				cbOnly : true,
				from : 'errors',
				subscribe : this.updateTargetView
			}
		]
	});
}

EachOnTheBeachComponent.prototype.updateTargetView = function(contentArray) {
	if (!Array.isArray(contentArray))
		return;
	
	if (this.shallUpdate(contentArray)) {
		this.setContentFromCacheOnTargetSubview();
		this.trigger('update', this.targetSubViewContentCache);
	}
	else if (!contentArray.length)
		this.reset();
}

EachOnTheBeachComponent.prototype.shallUpdate = function(contentArray) {
	if (Array.isArray(contentArray) && contentArray.length)
		return this.dirtyCheckTargetViewContent(contentArray);
}

EachOnTheBeachComponent.prototype.dirtyCheckTargetViewContent = function(contentArray) {
	if (!contentArray || !contentArray.length)
		return this.resetTargetSubViewContent();
	var exists = 0;
	contentArray.forEach(function(val) {
		(this.targetSubViewContentCache.indexOf(val) !== -1 && exists++);
	}, this);
	return (
			(!this.targetSubViewContentCache.length || exists !== this.targetSubViewContentCache.length)
					&& (this.targetSubViewContentCache = contentArray)
			);
}



module.exports = EachOnTheBeachComponent;