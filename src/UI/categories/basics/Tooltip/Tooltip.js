/**
 * @constructor Tooltip
 * 
*/
const {TemplateFactory, appConstants} = require('formantCore');

var InnerReactiveComponent = require('src/UI/categories/basics/InnerReactiveComponent/InnerReactiveComponent');

var createTooltipDef = require('src/UI/categories/basics/Tooltip/componentDefs/tooltipDef');


var Tooltip = function(def, parentView, parent) {
	// width calculation is handled in appConstants.textSizeGetter
	
	InnerReactiveComponent.call(this, def, parentView, parent);
	this.objectType = 'Tooltip';
	
	this.targetSubViewContentCache = ['no hint on this field'];
}
Tooltip.prototype = Object.create(InnerReactiveComponent.prototype);
Tooltip.prototype.objectType = 'Tooltip';

// CAUTION : _asyncInitTasks rely on an Array being present on the proto. But that Array is present only when addInterface creates it,
// via the onExtend callback.
// SO CREATE IT FIRST.
//Tooltip.prototype._asyncInitTasks = [];
//Tooltip.prototype._asyncRegisterTasks = [];
//
//Tooltip.prototype._asyncInitTasks.push(new TemplateFactory.TaskDefinition({
//		type : 'lastAddChild',
//		task : function(definition) {
//				this.pushChild(
//					new ReactiveEachSubComponent(
//						TemplateFactory.createHostDef({
//							UID : 'ZZ'
//						}),
//						this.view,
//						this
//					)
//				);
//			}
//	})
//)

Tooltip.prototype.createDefaultDef = function() {
	var defaultDef = createTooltipDef();
//	if (!defaultDef.getHostDef().subscribeOnSelf.length) { 
		defaultDef.getHostDef().subscribeOnSelf.push(new TemplateFactory.subscribeOnSelfModel({	
						on : 'update',
						subscribe : this.resize
					})
		);
//	}
//	if (defaultDef.getHostDef().reactOnParent.length === 1) { 
		defaultDef.getHostDef().reactOnParent.push(new TemplateFactory.reactOnParentModel({
				cbOnly : true,
				from : 'errors',
				subscribe : this.updateTargetView // updateTargetView() expects an array
			})
		);
//	}
	return defaultDef;
}

Tooltip.prototype.resize = function(e) {
	var messages = e.data;
	if (Array.isArray(messages) && messages.length) {
		var w = appConstants.textSizeGetter.getTextWidth(messages[0]) + 25;
		this.view.getMasterNode().style.width = w.toString() + 'px';
		return true;
	}
}


module.exports = Tooltip;