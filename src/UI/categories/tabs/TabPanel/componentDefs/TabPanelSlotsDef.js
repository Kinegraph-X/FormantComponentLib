/**
 * @def TabPanelSlots
 * @isGroup false
 * 
 * @CSSify styleName : TabPanelHeader
 * @CSSify styleName : TabPanelSection
 * @CSSifyTheme themeName : basic-light
 */
const {TemplateFactory, CreateStyle} = require('formantCore');


var TabPanelSlotsDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */ 	// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	const headerDef = TemplateFactory.createHostDef({
		type : 'NamedButton',
		nodeName : 'tab-header',
		states : [
			{role : "heading"},
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
		]/**@CSSify Style componentStyle : TabPanelHeader */
	});
	
	const sectionDef = TemplateFactory.createHostDef({
		type : 'ComponentWithView',
		nodeName : 'tab-panel'/**@CSSifyStyle componentStyle : TabPanelSection */
	});
	
	return {
		headerDef : headerDef,
		sectionDef : sectionDef
	};
}

module.exports = TabPanelSlotsDef;