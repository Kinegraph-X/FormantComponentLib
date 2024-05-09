/**
 * @interface scriptInjectorInterface
*/

const {TypeManager} = require('formantCore');
const {TemplateFactory} = require('formantCore');
//var commonUtilities = require('src/core/commonUtilities');

var createUserDefinedComponent = require('src/_DesignSystemManager/userDefinedComponent.template');

var inter = function() {
	
}
inter.prototype.constructor = inter;
inter.prototype.objectType = 'scriptInjectorInterface';

//inter.prototype.queueAsync = function(objectType) {
//	return new TypeManager.TaskDefinition({
//					type : 'viewExtend',
//					task : function(definition) {
//						var nodeDef = TypeManager.createComponentDef({
//							host : TypeManager.createComponentDef({
//								UID : 'dummy_host_anymay_members_won\'t_be_nested'
//							}, null, 'hostOnly'),
//							members : [
//								TypeManager.createComponentDef({
//									nodeName : 'header',
//								}, null, 'hostOnly'),
//								TypeManager.createComponentDef({
//									nodeName : 'script'
//								}, null, 'hostOnly'),
//								TypeManager.createComponentDef({
//									nodeName : 'div'
//								}, null, 'hostOnly')
//							]
//						}, null, 'rootOnly');
//						this.addReactiveMemberViewFromFreshDef(definition, nodeDef);
//					}
//				});
//}

//inter.prototype.queueAsyncRegister = function() {
//	
//	return new TypeManager.TaskDefinition({
//		type : 'lateBinding',
//		task : function(definition) {
//			this.addEventListener(
//				'ASTcleaned',
//				function(e) {
//					console.log(this);
//					var stringifiedRouterScript = createUserDefinedComponent(e.data.stringifiedScript);
////					console.log(stringifiedRouterScript);
//					console.log(this.view.getWrappingNode().querySelector('script'))
//					this.view.getWrappingNode().querySelector('script').textContent = stringifiedRouterScript;
//				}.bind(this)
//			);
//		}
//	});
//}

var _ScriptInjector = {
	
};

_ScriptInjector._injectScript = function() {
	
}


module.exports = inter;