/**
 * @def extensibleTableSlots
 * @isGroup false
 * 
 * 
 */


//var TypeManager = require('src/core/TypeManager');
const {TemplateFactory, CreateStyle, Components} = require('formantCore');


var extensibleTableSlotsDef = function(uniqueID, options, model) {
		
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	var headerDef = TemplateFactory.createHostDef({
		type : 'SimpleText',		// VaritextButtonWithPictoFirst
		nodeName : 'th',
		// this is a big hack of shit (should be an attribute, but not... should be a "DOM" attribute... -> setAttribute(). TODO: fix after re-implementation of _arias&glyphs)
		states : [
			{sortable : 'sortable'},
			{sortedasc : undefined},
			{sorteddesc : undefined}
		],
		props : [
			{headerTitle : undefined}
		],
		reactOnSelf : [
			{
				from : 'headerTitle',
				to : 'content'
			}
		]
	});
	
	var rowDef = TemplateFactory.createHostDef({
		type : 'ComponentWith_FastReactiveText',
		nodeName : 'tr',
		props : [
			{rowContentAsArray : undefined}
		],
		reactOnSelf : [
				{
					from : 'rowContentAsArray',
					cbOnly : true,
					subscribe : Components.ComponentWith_FastReactiveText.prototype.setContentFromArrayOnEachMemberView
				}
		]
	});
	
	// tdDef MUST be a view
	var tdDef = TemplateFactory.createDef({
		nodeName : 'td',
	});
	
	
	
	return {
		headerDef : headerDef,
		rowDef : rowDef,
		tdDef : tdDef
	};
}

module.exports = extensibleTableSlotsDef;