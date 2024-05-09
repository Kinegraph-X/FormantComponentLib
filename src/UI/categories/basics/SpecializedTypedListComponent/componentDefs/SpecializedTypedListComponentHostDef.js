/**
 * @def SpecializedTypedListComponent
 * @isGroup true
 * 
 * @CSSify styleName : SpecializedTypedListComponentHost
 * @CSSify styleName : SpecializedTypedListComponentTemplate
 * @CSSifyTheme themeName : basic-light
 * 
 */
const {TypeManager, CreateStyle} = require('formantCore');


var SpecializedTypedListComponentDef = function(uniqueID, options, model) {
	/**@CSSify DEBUG */		// DEBUG must be stuck (RED and bold) to trigger debug infos
		
	// Some CSS stuff (styles are directly injected in the main def below)
	/**@CSSifySlots placeholder */
	
	
	var moduleDef = TypeManager.createComponentDef({
				nodeName : 'specialized-typedlist'
//				,
//				props : [
//					{updateChannel : undefined}
//				],
//				reactOnSelf : [
//					{
//						from : 'updateChannel',
//						cbOnly : true,
//						subscribe : function(value) {
//							this.typedSlots[0].resetLength();
//							
////							console.log(value);
//							if (Array.isArray(value)) {
////								console.log('isArray', value);
//								// we got at least a set, but maybe a group of sets
//								if (Array.isArray(value[0])) {
////									console.log('memberIsArray', value[0]);
//									// it's a group
//									if (value[0][0]._id) {
////										console.log('firstMemberHasId', value[0][0]);
//										// we found the effective obj
//										var items = value.map(function(set) {
//											return this.typedSlots[0].newItem(set);
//										}, this);
////										console.log(items);
//										this.typedSlots[0].pushApply(items);
//										
////										console.log(this);
//										
////										console.log(this.typedSlots[0]);
//									}
//								}
//								else {
////									console.log(this.typedSlots[0]);
//									// it's a single set
//									this.typedSlots[0].push(
//										this.typedSlots[0].newItem(value)
//									);
//								}
//							}
//							else
//								console.warn(this.objectType, 'set-viewers are meant to instanciate lists, but value received was not an array');
//						}
//					}
//				]
				/**@CSSify Style componentStyle : SpecializedTypedListComponentHost */
		});
	
	return moduleDef;
}

module.exports = SpecializedTypedListComponentDef;