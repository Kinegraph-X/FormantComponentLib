/**
 * @def _componentName
 * @author : _authorName
 * @isGroup true
 * 
 * @CSSify styleName : _componentNameHost
 * @CSSify styleName : _componentNameTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
var TemplateFactory = require('src/core/TemplateFactory');
var CreateStyle = require('src/core/GenericStyleConstructor');


var _componentNameDef = function(uniqueID, options, model) {
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
			]/**@CSSifyStyle componentStyle : _componentNameTemplate */
		})
	});
	
	
	/*
	 * Build the schematic-def of the component: 
	 * 
	 * this one is pretty special...
	 * 
	 * This def is the base-def for any _componentName instance
	 * But, CAUTION: In order to implement different -individual- defs for the slots (and/or being able to -reduce- the slots count, if needed, without breaking the execution)
	 * 		=> we have to take into account that there is a !second! def obj, which is injected directly into the _componentName ctor
	 * 		=> so the _componentName must then be extended through prototypal inheritance, and :
	 * 			-*- eventually, his slotsDef property overridden (pre-defined) in the derived ctor
	 * 			-*- eventually, his slotsCount property {number} also overridden (pre-defined) in the derived ctor
	 * 			-*- and if the type of the slots must be different than "Dataset", his affectSlots() method must be overridden
	 */
	
	var moduleDef = TemplateFactory.createDef({
		host : TemplateFactory.createHostDef({
//			type : 'CompoundComponent', 				// this is not implicit if we want to use inference when building the def through the factory
			nodeName : '_componentName'.toLowerCase() + '-component'/**@CSSifyStyle componentStyle : _componentNameHost */
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

module.exports = _componentNameDef;