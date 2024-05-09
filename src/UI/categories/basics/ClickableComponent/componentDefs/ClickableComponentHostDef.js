/**
 * @def ClickableComponent
 * @author : Kinegraphx
 * @isGroup true
 * 
 * @CSSify styleName : ClickableComponentHost
 * @CSSify styleName : ClickableComponentTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TemplateFactory, CreateStyle} = require('formantCore');


var ClickableComponentDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// Remove the whitespace between @CSSify and the word DEBUG to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	// WARNING: One can use either the present factory, or the new one, named TemplateFactory.createDef()
	// => the new one tries to infer types, creating either a groupDef, on a simpleDef,
	// depending of the presence of certain properties, and of the hierarchical structure
	// TODO:  after a period of testing, progressively remove the old version
	var slotDef = TemplateFactory.createDef({
		host : TemplateFactory.createHostDef({
			type : 'ComponentWithView',
			nodeName : 'pseudo-slot',
			states : [],
			subscribeOnChild : [
				{
					on : 'update',
					subscribe : function(e) {
						if (e.bubble)
							this.trigger('update', e.data, true);
					}
				}
			]/**@CSSifyStyle componentStyle : ClickableComponentTemplate */
		})
	});
	
	
	/*
	 * Build the schematic-def of the component: 
	 * 
	 * this one is pretty special...
	 * 
	 * This def is the base-def for any ClickableComponent instance
	 * But, CAUTION: In order to implement different -individual- defs for the slots (and/or being able to -reduce- the slots count, if needed, without breaking the execution)
	 * 		=> we have to take into account that there is a !second! def obj, which is injected directly into the ClickableComponent ctor
	 * 		=> so the ClickableComponent must then be extended through prototypal inheritance, and :
	 * 			-*- eventually, his slotsDef property overridden (pre-defined) in the derived ctor
	 * 			-*- eventually, his slotsCount property {number} also overridden (pre-defined) in the derived ctor
	 * 			-*- and if the type of the slots must be different than "Dataset", his affectSlots() method must be overridden
	 */
	
	var moduleDef = TemplateFactory.createDef({
		host : TemplateFactory.createHostDef({
//			type : 'CompoundComponent', 				// this is not implicit if we want to use inference when building the def through the factory
			nodeName : 'ClickableComponent'.toLowerCase() + '-component'/**@CSSifyStyle componentStyle : ClickableComponentHost */
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

module.exports = ClickableComponentDef;