/**
 * @def GenericTitledPanelComponent
 * @isGroup true
 * 
 * @CSSify styleName : GenericTitledPanelComponentHost
 * @CSSify styleName : GenericTitledPanelComponentTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TypeManager, CreateStyle} = require('formantCore');


var GenericTitledPanelComponentDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	
	return TypeManager.createComponentDef({
				host : TypeManager.createComponentDef({
					type : 'GenericTitledPanelComponent',
					nodeName : 'generic-panel',
//					states : [
//						{unfolded : undefined} 
//					]
					/**@CSSifyStyle componentStyle : GenericTitledPanelComponentHost */
				}),
				members : [
					TypeManager.createComponentDef({
						type : 'ComponentWithView',
						nodeName : 'header'
					}),
					TypeManager.createComponentDef({
						type : 'ComponentWithView',
						nodeName : 'div',
						attributes : [
							{className : 'accordion_panel_shadow'}
						]
					}),
					TypeManager.createComponentDef({
						host : TypeManager.createComponentDef({
							type : 'CompoundComponent',
							nodeName : 'ul'
						})
					}, null, 'rootOnly'),
					TypeManager.createComponentDef({
						type : 'ComponentWithView',
						nodeName : 'div',
						attributes : [
							{className : 'accordion_panel_inverse_shadow'}
						]
					}),
					TypeManager.createComponentDef({
						type : 'ComponentWithView',
						nodeName : 'footer',
					})
				]
			}, null, 'rootOnly');
}

module.exports = GenericTitledPanelComponentDef;