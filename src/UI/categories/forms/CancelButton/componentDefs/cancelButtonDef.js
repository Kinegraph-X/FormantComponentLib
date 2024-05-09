/**
 * @def CancelButton
 * 
 * @CSSify styleName : CancelButtonHost
 * @CSSifyTheme themeName : basic-light
 * 
 */

const {TypeManager, CreateStyle} = require('formantCore');

var cancelButtonDef = function(uniqueID, options) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
	
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	return TypeManager.createComponentDef({
		nodeName : 'dummy'/**@CSSifyStyle componentStyle : CancelButtonHost */
	}); 
}

module.exports = cancelButtonDef;