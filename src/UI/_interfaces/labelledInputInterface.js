/**
 * @interface labelledInputInterface
*/


const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
var inter = function() {}
inter.prototype.objectType = 'labelledInputInterface';


inter.prototype.queueAsync = function(objectType) {
	return new TypeManager.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						var hostDef = definition.getHostDef();
						var nodeDef = TypeManager.createComponentDef({
								host : TypeManager.createComponentDef({
									UID : 'labelledInputInterface'
								}, null, 'hostOnly'),
								members : [
									TypeManager.createComponentDef({
										nodeName : 'label',
										attributes : [
											{title : 'label-for-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{htmlFor : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{innerHTML : '<span class="label">' + (hostDef.attributes.getObjectValueByKey('label') || '') + '</span>'}
										]
									}, null, 'hostOnly')
								]
						}, 'labelledInputInterface_' + this._defUID + '_' +  + this._defComposedUID, 'rootOnly');
					
						// There is a real probability for the default definition of the Component to have added - "one" - node:
						// 		e.g. an input, a button, a select, even maybe an invisible checkbox
						if (this.view.subViewsHolder.memberViews.length === 1)
							this.view.subViewsHolder.immediateUnshiftMemberView(nodeDef.members[0]);
						else
							this.view.subViewsHolder.addMemberViewFromDef(nodeDef.members[0]);
					}
	});
}

module.exports = inter;