/**
 * @def ClickableComponentSlots
 * @author : Kinegraphx
 * @isGroup false
 * 
 * @CSSify styleName : ClickableComponentHeader
 * @CSSify styleName : ClickableComponentSection
 * @CSSifyTheme themeName : basic-light
 */
const {TemplateFactory, CreateStyle} = require('formantCore');


var ClickableComponentSlotsDef = function(uniqueID, options, model) {
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
			]/**@CSSifyStyle componentStyle : ClickableComponentHeader */
		})
	});
	
	// WARNING: One can use either the present factory, or the new one, named TemplateFactory.createDef()
	// => the new one tries to infer types, creating either a groupDef, on a simpleDef,
	// depending of the presence of certain properties, and of the hierarchical structure
	// TODO:  after a period of testing, progressively remove the old version
	var sectionDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			type : 'ComponentWithView',
			nodeName : 'pseudoslot-panel'/**@CSSifyStyle componentStyle : ClickableComponentSection */
		})
	});
	
	
	
	return {
		headerDef : headerDef,
		sectionDef : sectionDef
	};
}

module.exports = ClickableComponentSlotsDef;