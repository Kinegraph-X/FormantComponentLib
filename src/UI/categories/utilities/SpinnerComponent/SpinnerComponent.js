/**
* @constructor SpinnerComponent
*/


const {TemplateFactory, Components} = require('formantCore');
//var CoreTypes = require('src/core/CoreTypes');

//var spinnerStyle = require('src/UI/defs/extraStyles/spinner');

var SpinnerComponent = function(def, containerDOMId, automakeable) {
	Components.ComponentWithHooks.apply(this, arguments);
	this.objectType = 'SpinnerComponent';
}

SpinnerComponent.prototype = Object.create(Components.ComponentWithHooks.prototype);SpinnerComponent.prototype.objectType = 'SpinnerComponent';

SpinnerComponent.prototype.createDefaultDef = function() {
	return TemplateFactory.createDef({
				host : TemplateFactory.createDef({
					nodeName : 'loading-spinner',
					attributes : [
						{id : 'loading_spinner_3'},
						{className : 'spinner ' + this._defUID}
					],
					states : [
						{hidden : undefined}
					],
					reactOnParent : [
						{
							from : 'spinnerOn',
							to : 'hidden',
							map : function(val) {return val ? null : 'hidden';}
						}
					],
//					sWrapper : CreateStyle('spinner_style', null, spinnerStyle).sWrapper // should be entirely rewritten (source has been lost)
				}, null, 'hostOnly'),
				members : [
					TemplateFactory.createDef({
						nodeName : 'div'
					}, null, 'hostOnly'),
					TemplateFactory.createDef({
						nodeName : 'div'
					}, null, 'hostOnly'),
					TemplateFactory.createDef({
						nodeName : 'div'
					}, null, 'hostOnly')
				]
		}, 'SpinnerComponent', 'rootOnly');
}



module.exports = SpinnerComponent;
