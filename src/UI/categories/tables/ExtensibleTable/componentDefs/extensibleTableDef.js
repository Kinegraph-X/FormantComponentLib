/**
 * @def extensibleTableDef
 * @isGroup true
 * 
 * @CSSify styleName : ExtensibleTableHost
 * @CSSify styleName : ExtensibleTablePseudoSlot
 */


//var TypeManager = require('src/core/TypeManager');
const {TemplateFactory, CreateStyle} = require('formantCore');

var extensibleTableDef = function(uniqueID, options, model) {
		
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	
	const slotDef = TemplateFactory.createHostDef({
//		host : TemplateFactory.createDef({
			type : 'ComponentWithView',
			nodeName : 'tbody',
			states : [
				{'slot-id' : undefined},
				{'is-embedded' : undefined},
				{'position' : undefined}
				
			],
			subscribeOnChild : [
				{
					on : 'update',
					subscribe : function(e) {
						if (e.bubble)
							this.trigger('update', e.data, true);
					}
				}
			]/**@CSSify Style componentStyle : ExtensibleTablePseudoSlot */
//		}, null, 'hostOnly')
	});
	
	const moduleDef = TemplateFactory.createDef({
		host : TemplateFactory.createHostDef({
//			type : 'ComposedCompnent', 				// this is implicit, as we call the CompoundComponent ctor in the TabPanel ctor
			nodeName : 'extensible-table',
			props : [
				{updateChannel : undefined}
			]/**@CSSifyStyle componentStyle : ExtensibleTableHost */
		}),
		lists : [
			TemplateFactory.createDef({
				type : 'ComponentList',
				template : slotDef
			})
		]
	});
	
	return moduleDef;
}

module.exports = extensibleTableDef;