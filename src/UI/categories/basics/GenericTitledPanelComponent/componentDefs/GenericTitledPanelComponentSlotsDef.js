/**
 * @def GenericTitledPanelComponentSlots
 * @isGroup false
 * 
 * @CSSify styleName : GenericTitledPanelComponentTemplate/false
 * @CSSifyTheme themeName : basic-light
 */
const {TypeManager, CreateStyle} = require('formantCore');


var GenericTitledPanelComponentSlotsDef = function(uniqueID, options, model) {
		/**@CSSify DEBUG */		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */

	
	return TypeManager.createComponentDef({
				type : 'GenericTitledPanelComponent',
				nodeName : 'accordion-panel'/**@CSSifyStyle componentStyle : GenericTitledPanelComponentTemplate */
			});
}

module.exports = GenericTitledPanelComponentSlotsDef;