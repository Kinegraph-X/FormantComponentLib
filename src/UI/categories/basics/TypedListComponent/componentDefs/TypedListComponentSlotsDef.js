/**
 * @def TypedListComponentSlots
 * @isGroup false
 * 
 * @CSSify styleName : TypedListComponentHeader
 * @CSSify styleName : TypedListComponentSection
 */
const {TypeManager, CreateStyle} = require('formantCore');


var TypedListComponentSlotsDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */ 		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	

	
	var hostedComponentDef = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
			type : 'ComponentWithView',
			nodeName : 'hosted-component',
			props : [
				{labelTitle : undefined}
			]/**@CSSify Style componentStyle : TypedListComponentSection */
		}, null, 'hostOnly')
	}, null, 'rootOnly');
	
	
	
	return {
		hostedComponentDef : hostedComponentDef
	};
}

module.exports = TypedListComponentSlotsDef;