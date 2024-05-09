/**
 * @interface spinnerInterface
*/


const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
var inter = function() {}
inter.prototype.objectType = 'spinnerInterface';


inter.prototype.queueAsync = function(objectType) {
	return new TypeManager.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						var hostDef = definition.getHostDef();
						var nodeDef = TypeManager.createComponentDef({
								host : TypeManager.createComponentDef({
									UID : 'spinnerInterface'
								}, null, 'hostOnly'),
								members : [
									TypeManager.createComponentDef({
										nodeName : 'div',
										attributes : [
											{id : 'loading-spinner-' + objectType},
											{className : 'spinner'},
											{innerHTML : '<div></div><div></div><div></div>'}
										],
									}, null, 'hostOnly')
								]
						}, 'spinnerInterface' + this._defUID + '_' +  + this._defComposedUID, 'rootOnly');
					
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