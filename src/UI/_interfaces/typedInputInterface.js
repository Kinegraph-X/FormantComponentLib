/**
 * @interface typedInputInterface
*/
const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
const {Registries} = require('formantCore');
var ariasAndGlyphs = require('src/UI/categories/_configurationFiles/_arias&glyphsDef');

var inter = function() {}
inter.prototype.objectType = 'typedInputInterface';

inter.prototype.queueAsync = function(objectType) {
	return new TypeManager.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						
						if ((this.view.subViewsHolder.memberViews.length > 1
								&& Registries.caches.attributes.getItem(this.view.subViewsHolder.memberViews[1]._defUID).getObjectValueByKey('type'))
									|| definition.getHostDef().attributes.getObjectValueByKey('type'))
							return;
						
						switch(definition.getHostDef().attributes.getObjectValueByKey('title')) {
							
							case 'E-Mail' :
								Registries.caches.attributes.getItem(this.view.subViewsHolder.memberViews[1]._defUID)
									.push(new TypeManager.attributesModel({type : 'email'}));
								break;
							case 'Password' :
							case 'API-Password' : 
								Registries.caches.attributes.getItem(this.view.subViewsHolder.memberViews[1]._defUID)
									.push(new TypeManager.attributesModel({type : 'password'}));
								break;
							case 'Submit' : 
								Registries.caches.attributes.getItem(this.view._defUID)
									.push(new TypeManager.attributesModel({type : 'button'}));
								break;
							case 'Cancel' :
								break;
							case 'Username' :
							default :
								Registries.caches.attributes.getItem(this.view.subViewsHolder.memberViews[1]._defUID)
									.push(new TypeManager.attributesModel({type : 'text'}));
								break;
						}
					}
	});
}

inter.prototype.setArias = function() {
	var arias = ariasAndGlyphs.getArias(this.objectType);
	for(var aria in arias) {
		this.view.getMasterNode().setAttribute(aria, arias[aria]);
	}
}

module.exports = inter;