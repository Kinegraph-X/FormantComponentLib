/**
 * @def Fieldset
 * @isGroup true
 * 
 * @CSSify styleName : FieldsetHost
 * @CSSify styleName : FieldsetSlots
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TypeManager, CreateStyle, Components} = require('formantCore');


var FieldsetDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	return TypeManager.createComponentDef({
		host : TypeManager.createComponentDef({
			host : TypeManager.createComponentDef({
				nodeName : 'fieldset',
	//			props : [							// hint: we have to choose between a text by default, or a text always defined by the implementation
	//				{slotsTextContent : undefined}
	//			],
				reactOnSelf : [
						{
							from : 'slotsTextContent',
							cbOnly : true,
							subscribe : Components.ComponentWithReactiveText.prototype.setContentFromArrayOnEachMemberView
						}
				]
				// Fieldset isn't a wustom element, then it cannot be styled
				/**@CSSify Style componentStyle : FieldsetHost */
			}, null, 'hostOnly'),
			members : [
				TypeManager.createComponentDef({
					nodeName : 'legend',
				}, null, 'hostOnly')
			]
		}, null, 'rootOnly')
	}, null, 'rootOnly');
	
}

module.exports = FieldsetDef;