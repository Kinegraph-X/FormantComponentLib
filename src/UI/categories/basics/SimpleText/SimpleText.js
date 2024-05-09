/**
 * @constructor SimpleText
*/

const {TemplateFactory, Components} = require('formantCore');


const SimpleText = function() {
	Components.ComponentWithReactiveText.apply(this, arguments);
	this.objectType = 'SimpleText';
}
SimpleText.prototype = Object.create(Components.ComponentWithReactiveText.prototype);
SimpleText.prototype.objectType = 'SimpleText';

SimpleText.prototype.createDefaultDef = function(componentDef) {
	var def = TemplateFactory.createHostDef({
			props : [
//				{text : undefined}		// REMINDER: Keep this line commented
				{content : undefined}
			],
			reactOnSelf : [
				{to : 'content', cbOnly : true, subscribe : this.appendTextFromValueOnView},
				{from : 'text', to : 'content'}
			]
	});
	
	// Sort of a Hack, to reduce the risk of errors for the user:
	// In case of a component choosing not to define a "text"" prop
	// but rather, for example, reactOnParent directly to "content"
	if (!componentDef.getHostDef().props.hasObjectByKey('text')) {
		var textProp = new TemplateFactory.propsModel({text : undefined});
		def.getHostDef().props.push(textProp);
		def.getHostDef().streams.push(textProp);
	}
	
	return def;
}



module.exports = SimpleText;