/**
 * @def formComponent
 * @CSSify styleName : FormComponentHost
 * @CSSifyTheme themeName : basic-light
 */

const {TemplateFactory, CreateStyle} = require('formantCore');

var formComponentDef = function(uniqueID, options) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	return TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			isCompound : true,
			nodeName : 'smart-form'/**@CSSifyStyle componentStyle : FormComponentHost */
			// Reminder
//			states : [
//				{action : ''}
//			]
			
		}),
		subSections : [
			TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'ComponentWithView',
					nodeName : 'section'
				})
			}),
			TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					type : 'ComponentWithView',
					nodeName : 'section'
				})
			})
		],
		members : [
			// Sample code
//			TemplateFactory.createDef({
//				host : TemplateFactory.createDef({
//					type : 'SubmitButton',
//					nodeName : 'button',
//					section : 1,
//					props : [
//						{text : 'Open File'}
//					]
//				})
//			}),
//			TemplateFactory.createDef({
//				host : TemplateFactory.createDef({
//					type : 'CancelButton',
//					nodeName : 'button',
//					section : 1,
//					props : [
//						{text : 'Cancel'}
//					]
//				})
//			})
		]
	}); 
}

module.exports = formComponentDef;