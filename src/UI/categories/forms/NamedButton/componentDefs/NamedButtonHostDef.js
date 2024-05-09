/**
 * @def NamedButton
 * @isGroup true
 * 
 * @CSSify styleName : NamedButtonHost
 * @CSSify styleName : NamedButtonTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TemplateFactory, CreateStyle} = require('formantCore');


var NamedButtonDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	var moduleDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			nodeName : 'named-button'/**@CSSifyStyle componentStyle : NamedButtonHost */
		})
	});
	
	return moduleDef;
}

module.exports = NamedButtonDef;