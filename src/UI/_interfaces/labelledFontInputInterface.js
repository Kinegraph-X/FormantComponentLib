/**
 * @interface labelledFontInputInterface
*/


const {TypeManager} = require('formantCore');const {TemplateFactory} = require('formantCore');
var inter = function() {}
inter.prototype.objectType = 'labelledFontInputInterface';


inter.prototype.queueAsync = function(objectType) {
	return new TypeManager.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						var hostDef = definition.getHostDef();
						var nodeDef = TypeManager.createComponentDef({
								host : TypeManager.createComponentDef({
									UID : 'labelledFontInputInterface'
								}, null, 'hostOnly'),
								members : [
									TypeManager.createComponentDef({
										nodeName : 'label',
										attributes : [
//											{title : 'label-for-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{htmlFor : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
//											{innerHTML : '<span class="label">' + (hostDef.attributes.getObjectValueByKey('label') || '') + '</span>'}
										],
										templateNodeName : 'span'
									}, null, 'hostOnly'),
									TypeManager.createComponentDef({
										nodeName : 'input',
										attributes : [
											{id : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{title : (hostDef.attributes.getObjectValueByKey('id') || '')},
											{type : 'text'},
											{role : 'button'},
											hostDef.attributes.findObjectByKey('name')
										]
									}, null, 'hostOnly')
								]
						}, 'labelledFontInputInterface_' + this._defUID + '_' +  + this._defComposedUID, 'rootOnly');
					
						this.addReactiveMemberViewFromFreshDef(definition, nodeDef);
					}
	});
}

module.exports = inter;