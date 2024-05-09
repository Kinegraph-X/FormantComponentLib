/**
 * @def TabPanel
 * @isGroup true
 * 
 * @CSSify styleName : TabPanelHost
 * @CSSify styleName : TabPanelSlotTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TemplateFactory, CreateStyle} = require('formantCore');

const tabPanelDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	const slotDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			type : 'ComponentWithView',
			nodeName : 'pseudo-slot',
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
			]/**@CSSifyStyle componentStyle : TabPanelSlotTemplate */
		})
	});
	
	const moduleDef = TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			nodeName : 'smart-tabs',
			isCompound : true/**@CSSifyStyle componentStyle : TabPanelHost */
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

module.exports = tabPanelDef;