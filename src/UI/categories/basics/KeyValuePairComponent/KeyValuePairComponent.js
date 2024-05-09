/**
 * @constructor KeyValuePairComponent
*/

const {TemplateFactory, Components} = require('formantCore');

//var keyValueListSlotsDef = require('src/UI/packages_defs/structs/keyValueListSlotsDef');

var KeyValuePairComponent = function() {
	Components.ComponentWithReactiveText.apply(this, arguments);
	this.objectType = 'KeyValuePairComponent';
}
KeyValuePairComponent.prototype = Object.create(Components.ComponentWithReactiveText.prototype);
KeyValuePairComponent.prototype.objectType = 'KeyValuePairComponent';

KeyValuePairComponent.prototype.createDefaultDef = function() {
	return TemplateFactory.createDef({
		host : TemplateFactory.createDef({
			nodeName : 'tr',
			props : [
				{keyValuePair : undefined}
			],
			reactOnSelf : [
					{
						from : 'keyValuePair',
						cbOnly : true,
						subscribe : this.setContentFromArrayOnEachMemberView
					}
			],
//			sWrapper : keyValueListSlotsDef().headerDef.getHostDef().sWrapper
		}),
		members : [
			TemplateFactory.createDef({
				nodeName : 'td',
			}),
			TemplateFactory.createDef({
				nodeName : 'td',
			})
		]
	});
}

module.exports = KeyValuePairComponent;