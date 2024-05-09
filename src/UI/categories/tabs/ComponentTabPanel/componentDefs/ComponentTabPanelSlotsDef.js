/**
 * @def ComponentTabPanelSlots
 * @isGroup false
 * 
 * @CSSify styleName : ComponentTabPanelHeader
 * @CSSify styleName : ComponentTabPanelSection
 * @CSSifyTheme themeName : basic-light
 */
const {TypeManager, CreateStyle} = require('formantCore');


var ComponentTabPanelSlotsDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */ 	// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	// WARNING: One can use either the present factory, or the new one, named TypeManager.createDef()
	// => the new one tries to infer types, creating either a groupDef, on a simpleDef,
	// depending of the presence of certain properties, and of the hierarchical structure
	// TODO:  after a period of testing, progressively remove the old version
	var headerDef = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
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
			]/**@CSSifyStyle componentStyle : ComponentTabPanelHeader */
		}, null, 'hostOnly')
	}, null, 'rootOnly');
	
	// WARNING: One can use either the present factory, or the new one, named TypeManager.createDef()
	// => the new one tries to infer types, creating either a groupDef, on a simpleDef,
	// depending of the presence of certain properties, and of the hierarchical structure
	// TODO:  after a period of testing, progressively remove the old version
	var sectionDef = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
			nodeName : 'pseudoslot-panel'/**@CSSifyStyle componentStyle : ComponentTabPanelSection */
		}, null, 'hostOnly')
	}, null, 'rootOnly');
	
	
	
	return {
		headerDef : headerDef,
		sectionDef : sectionDef
	};
}

module.exports = ComponentTabPanelSlotsDef;