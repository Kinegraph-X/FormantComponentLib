/**
 * @interface labelledBorderSwatchInterface
*/


const {TemplateFactory} = require('formantCore');
var inter = function() {}
inter.prototype.objectType = 'labelledBorderSwatchInterface';


inter.prototype.queueAsync = function(objectType) {
	return new TemplateFactory.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						var hostDef = definition.getHostDef();
						var nodeDef = TemplateFactory.createDef({
								host : TemplateFactory.createDef({
									UID : 'labelledBorderSwatchInterface'
								}, null, 'hostOnly'),
								members : [
									TemplateFactory.createDef({
										nodeName : 'label',
										attributes : [
//											{title : 'label-for-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{htmlFor : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
//											{innerHTML : '<span class="label">' + (hostDef.attributes.getObjectValueByKey('label') || '') + '</span>'}
										],
										templateNodeName : 'span'
									}, null, 'hostOnly'),
									TemplateFactory.createDef({
										nodeName : 'select',
										attributes : [
											{id : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{title : (hostDef.attributes.getObjectValueByKey('id') || '')},
											{role : 'button'},
											hostDef.attributes.findObjectByKey('name'),
											{hidden : 'hidden'}
										]
									}, null, 'hostOnly'),
									TemplateFactory.createDef({
										nodeName : 'div',
										attributes : [
											{className : 'border_sample'},
											{innerHTML : '<div class="border_sample_inner"></div>'}
										]
									}, null, 'hostOnly')
								]
						}, 'labelledBorderSwatchInterface_' + this._defUID + '_' +  + this._defComposedUID, 'rootOnly');
					
						this.addReactiveMemberViewFromFreshDef(definition, nodeDef);
					}
	});
}

module.exports = inter;