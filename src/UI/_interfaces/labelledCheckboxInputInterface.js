/**
 * @interface labelledTextInputInterface
*/


const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
var inter = function() {}
inter.prototype.objectType = 'labelledTextInputInterface';

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
									}, null, 'hostOnly'),
									TypeManager.createComponentDef({
										nodeName : 'input',
										attributes : [
											{type : 'checkbox'},
											{id : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{title : (hostDef.attributes.getObjectValueByKey('id') || '')},
											hostDef.attributes.findObjectByKey('name'),
											hostDef.attributes.findObjectByKey('placeholder')
										]
									}, null, 'hostOnly')
								]
						}, 'labelledInputInterface_' + this._defUID + '_' +  + this._defComposedUID, 'rootOnly');
//						console.log(hostDef, hostDef.attributes.findObjectByKey('name'));
//						console.log('LABELLEDIPUT', nodeDef.members);
						
//						if (hostDef.attributes.getObjectValueByKey('label').match(/password/i)) {
//							nodeDef.members[1].attributes.type = 'password';			
//						}
						this.addReactiveMemberViewFromFreshDef(definition, nodeDef);
					}
	});
}

module.exports = inter;