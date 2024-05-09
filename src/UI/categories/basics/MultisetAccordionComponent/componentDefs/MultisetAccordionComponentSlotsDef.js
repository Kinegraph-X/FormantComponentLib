/**
 * @def MultisetAccordionComponentSlots
 * @isGroup false
 * 
 * @CSSify styleName : MultisetAccordionComponentSet
 * @CSSifyTheme themeName : basic-light
 */
const {TypeManager, CreateStyle} = require('formantCore');


var MultisetAccordionComponentSlotsDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */ 		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	var setDef = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
			type : 'CompoundComponent',
			nodeName : 'accordion-set'/**@CSSifyStyle componentStyle : MultisetAccordionComponentSet */
		})
	}, null, 'rootOnly');

	return setDef;
}

module.exports = MultisetAccordionComponentSlotsDef;