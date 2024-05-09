/**
 * @def boolSelector
 * 
 * @CSSify hostName : boolSelector
 * @CSSifyRule rule : host flexBoxRow/flexCenter
 * @CSSifyRule rule : track inlineBlock/lineHeightEquiv/doubleLineWidthEquiv/ridge/bigRoundedCorner/border/inset_F
 * @CSSifyRule rule : handle spanHandle/bigRoundedCorner/flatLightButton_F
 */

const {TypeManager, CreateStyle} = require('formantCore');

var boolSelectorDef = function(uniqueID, options) {
	var context = this.context,
		selectorOptions = {
			handleClassName : 'handle',
			orientation : 'horizontal',		// this are default values
			min : 0,						// this are default values
			max : 100,						// this are default values
			step : 100, 					// step represents the "length" of a step, in the min/max interval
			constrainsToInner : true 		// constrainsToInner restricts min and max computation to half the width of the handle on the "max" side
											// min alignement by setting a negative margin on the handle should be handled at component level
		},
		options = Object.assign(options, selectorOptions),
		styles,
		styleDef;
		styles = [
/*@CSSifySlot*/
		];
		
	styleDef = CreateStyle('bool_selector', {id : '', className : 'bool_selector_handle'}, styles);
	var moduleDef = TypeManager.createComponentDef({
		UID : 'dummy',
		sWrapper : styleDef.sWrapper
	});

	return moduleDef;
}

boolSelectorDef.__factory_name = 'boolSelectorDef';
module.exports = boolSelectorDef;