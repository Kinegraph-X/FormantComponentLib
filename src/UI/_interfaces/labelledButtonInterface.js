/**
 * @interface labelledButtonInterface
*/


const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
var inter = function() {
	this.createEvent('clicked_ok');
}
inter.prototype.objectType = 'labelledButtonInterface';


inter.prototype.queueAsync = function(objectType) {
	return new TypeManager.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						var hostDef = definition.getHostDef();
						var nodeDef = TypeManager.createComponentDef({
								host : TypeManager.createComponentDef({
									UID : 'labelledButtonInterface'
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
										nodeName : 'button',
										attributes : [
											{id : 'input-' + (hostDef.attributes.getObjectValueByKey('id') || '')},
											{title : (hostDef.attributes.getObjectValueByKey('id') || '')},
											{role : 'button'},
											hostDef.attributes.findObjectByKey('name')
										]
									}, null, 'hostOnly')
								]
						}, 'labelledButtonInterface_' + this._defUID + '_' +  + this._defComposedUID, 'rootOnly');
					
						this.addReactiveMemberViewFromFreshDef(definition, nodeDef);
					}
	});
}

inter.prototype.registerEvents = function() {
	this.view.subViewsHolder.memberAt(1).addEventLListener('mouseDown', this.handleClickEvent.bind(this));
}

inter.prototype.handleClickEvent = function(e) {
	this.trigger('clicked_ok', {self_key : this._key, self_UID : this._UID});
}


module.exports = inter;