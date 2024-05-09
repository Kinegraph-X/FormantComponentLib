/**
 * @def tooltip
 * 
 * @CSSify styleName : TooltipHost
 * 
 */

const {TemplateFactory, CreateStyle} = require('formantCore');

var tooltipDef = function(uniqueID, options) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */

	var moduleDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			nodeName : 'input-tooltip',
//			attributes : [
//				{className : 'tooltip'}
//			],
			states : [
				{hidden : true}
			],
			props : [
				{contentToList : null}
			],
			reactOnParent : [
				{
					from : 'valid',
					to : 'hidden',
				}
			],
			targetSlotIndex : 1,
			templateNodeName : 'p'/**@CSSifyStyle componentStyle : TooltipHost */
		}),
		members : [
			TemplateFactory.createDef({
				nodeName : 'header'
			}),
			TemplateFactory.createDef({
				nodeName : 'section'
			})
		]
	});

	return moduleDef;
}

tooltipDef.__factory_name = 'tooltipDef';
module.exports = tooltipDef;