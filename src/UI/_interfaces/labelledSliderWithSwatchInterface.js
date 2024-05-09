/**
 * @interface labelledSliderWithSwatchInterface
*/


const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
var inter = function() {}
inter.prototype.objectType = 'labelledSliderWithSwatchInterface';

inter.prototype.queueAsync = function(objectType) {
	return new TypeManager.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
//						console.log('TypeManager.viewsRegistry.length', TypeManager.viewsRegistry.length);
//						var oldIdx = TypeManager.viewsRegistry.length;
						
						var hostDef = definition.getHostDef();
						var nodeDefBefore = TypeManager.createComponentDef({
								host : TypeManager.createComponentDef({
									UID : 'labelledSliderWithSwatchInterface'
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
						}, null, 'rootOnly');
					
						this.addReactiveMemberViewFromFreshDef(definition, nodeDefBefore);
//						console.log('TypeManager.viewsRegistry.length', TypeManager.viewsRegistry.length);
//						this.view.subViewsHolder.moveLastMemberViewTo(0, 2, oldIdx);
						
						var nodeDefAfter = TypeManager.createComponentDef({
								host : TypeManager.createComponentDef({
									UID : 'labelledSliderWithSwatchInterface'
								}, null, 'hostOnly'),
								members : [
									TypeManager.createComponentDef({
										nodeName : 'input',
										attributes : [
											{id : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{title : (hostDef.attributes.getObjectValueByKey('id') || '')},
											hostDef.attributes.findObjectByKey('name'),
//											hostDef.attributes.findObjectByKey('placeholder')
										]
									}, null, 'hostOnly')
								]
						}, null, 'rootOnly');
					
						this.addReactiveMemberViewFromFreshDef(definition, nodeDefAfter);
					}
	});
}

module.exports = inter;