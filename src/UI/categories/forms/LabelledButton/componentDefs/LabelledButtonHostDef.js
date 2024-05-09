/**
 * @def LabelledButton
 * @isGroup true
 * 
 * @CSSify styleName : LabelledButtonHost
 * @CSSify styleName : LabelledButtonTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TypeManager, CreateStyle} = require('formantCore');


var LabelledButtonDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	var moduleDef = TypeManager.createComponentDef({
			host : TypeManager.createComponentDef({
					type : 'LabelledButton',
					nodeName : 'labelled-button',
					subscribeOnChild : [
						{
							on : 'clicked_ok',
							subscribe : function(e) {
								this.trigger('update', e.data);
							}
						}
					]/**@CSSify Style componentStyle LabelledButtonHost */
			})
		}, null, 'rootOnly');
	
	return moduleDef;
}

module.exports = LabelledButtonDef;