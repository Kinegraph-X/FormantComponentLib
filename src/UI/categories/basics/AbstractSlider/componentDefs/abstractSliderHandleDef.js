/**
 * @def abstractSliderHandleDef
 * @isGroup true
 * 
 */


const {TypeManager, CreateStyle} = require('formantCore');


var abstractSliderHandleDef = function(uniqueID, options, model) {
		
	// Some CSS stuff (styles are directly injected in the main def below)
	var styles = [
/*@CSSifySlot*/
		];
	
	
	var handleDef = TypeManager.createComponentDef({
		nodeName : 'slider-handle',
		attributes : [
			{id : 'slider-handle-' + TypeManager.UIDGenerator.newUID()}
		]
	}, null, 'hostOnly');
	
	return handleDef;
}

abstractSliderHandleDef.__factory_name = 'abstractSliderHandleDef';
module.exports = abstractSliderHandleDef;