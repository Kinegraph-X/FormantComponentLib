/**
 * @def textInput
 * 
 * @CSSify styleName : TextInputHost
 * 
 */

const {TemplateFactory, CreateStyle} = require('formantCore');

var textInputDef = function(uniqueID, options) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	// DUMMY Def: only used to assign a sWrapper anda sOverride prop to the "real" def in the component
	var textInputDef = TemplateFactory.createHostDef({
		UID : 'dummy'/**@CSSifyStyle componentStyle : TextInputHost */
	}); 
	return textInputDef;
}

module.exports = textInputDef;