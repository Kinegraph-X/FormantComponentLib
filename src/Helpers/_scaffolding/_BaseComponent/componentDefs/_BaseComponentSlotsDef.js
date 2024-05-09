/**
 * @def _componentNameSlots
 * @author : _authorName
 * @isGroup false
 * 
 * @CSSify styleName : _componentNameHeader
 * @CSSify styleName : _componentNameSection
 * @CSSifyTheme themeName : basic-light
 */
var TemplateFactory = require('src/core/TemplateFactory');
var CreateStyle = require('src/core/GenericStyleConstructor');


var _componentNameSlotsDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */ 	// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	// WARNING: One can use either the present factory, or the new one, named TemplateFactory.createDef()
	// => the new one tries to infer types, creating either a groupDef, on a simpleDef,
	// depending of the presence of certain properties, and of the hierarchical structure
	// TODO:  after a period of testing, progressively remove the old version
	var headerDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			type : 'VaritextButton',
			nodeName : 'header',
			states : [
				{highlighted : undefined}
			],
			props : [
				{headerTitle : undefined}
			],
			reactOnSelf : [
				{
					from : 'headerTitle',
					to : 'content'
				}
			]/**@CSSifyStyle componentStyle : _componentNameHeader */
		})
	});
	
	// WARNING: One can use either the present factory, or the new one, named TemplateFactory.createDef()
	// => the new one tries to infer types, creating either a groupDef, on a simpleDef,
	// depending of the presence of certain properties, and of the hierarchical structure
	// TODO:  after a period of testing, progressively remove the old version
	var sectionDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			type : 'ComponentWithView',
			nodeName : 'pseudoslot-panel'/**@CSSifyStyle componentStyle : _componentNameSection */
		})
	});
	
	
	
	return {
		headerDef : headerDef,
		sectionDef : sectionDef
	};
}

module.exports = _componentNameSlotsDef;