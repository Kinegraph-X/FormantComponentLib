/**
 * @def TypedListComponent
 * @isGroup true
 * 
 * @CSSify styleName : TypedListComponentHost
 * @CSSify styleName : TypedListComponentTemplate
 * 
 */
const {TypeManager, CreateStyle} = require('formantCore');


var TypedListComponentDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	

	var moduleDef = TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
//			type : 'ComposedCompnent', 				// this is implicit, as we call the CompoundComponent ctor in the TabPanel ctor
			nodeName : 'typed-list'/**@CSSify Style componentStyle : TypedListComponentHost */
		})
	}, null, 'rootOnly');
	
	return moduleDef;
}

module.exports = TypedListComponentDef;