/**
 * @def MultisetAccordionComponent
 * @isGroup true
 * 
 * @CSSify styleName : MultisetAccordionComponentHost/true
 * @CSSify styleName : MultisetAccordionComponentSet/true
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TypeManager, CreateStyle} = require('formantCore');


var MultisetAccordionComponentDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	// The ("almost" ?) only def that CAN'T cache is the def of a pseudo-slot:
	// 		There's a quasi-systematic risk that at some point that def is specialized:
	// 		=> it's not a default def, it's combined with the "concrete" def, and so mutable.
	var setDef = TypeManager.createComponentDef({
			type : 'ComponentWithView',
			nodeName : 'accordion-set',
			states : [
				{"accordion-set" : undefined}
			]/**@CSSify Style componentStyle : MultisetAccordionComponentSet */
	});
	
	
	var moduleDef = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
			type : 'MultisetAccordionComponent',
			nodeName : 'reactive-accordion'/**@CSSify Style componentStyle : MultisetAccordionComponentHost */
		}),
		lists : [
			TypeManager.createComponentDef({
				type : 'ComponentList',
				template : setDef
			})
		]
	}, null, 'rootOnly');

	return moduleDef;
	
//	return {
//		setDef : setDef//,
//		moduleDef : moduleDef	
//	};
}

module.exports = MultisetAccordionComponentDef;