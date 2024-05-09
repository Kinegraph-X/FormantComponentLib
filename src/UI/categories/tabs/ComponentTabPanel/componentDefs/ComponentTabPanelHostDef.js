/**
 * @def ComponentTabPanel
 * @isGroup true
 * 
 * @CSSify styleName : ComponentTabPanelHost
 * @CSSify styleName : ComponentTabPanelTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TemplateFactory, CreateStyle} = require('formantCore');


var ComponentTabPanelDef = function(uniqueID, options, model) {
	/**@CSSifyDEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	var defaultDefForStyle = TemplateFactory.createHostDef({
		nodeName : 'dummy'/**@CSSifyStyle componentStyle : ComponentTabPanelHost */
	});

	
	return defaultDefForStyle;
}

module.exports = ComponentTabPanelDef;