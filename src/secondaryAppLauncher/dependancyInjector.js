const {App, Components, ReactiveDataset, ComponentSet} = require('formantCore');

// Components relying on core components
Components.CompositorComponent.createAppLevelExtendedComponent();

//temporary tests during the re-organisation of the component-lib
if (typeof App.componentTypes.KeyValueList !== 'undefined')
	App.componentTypes.KeyValueList.prototype.render = function(DOMNodeId) {
		new App.DelayedDecoration(DOMNodeId, this, this.listTemplate.getHostDef());
	};
if (typeof App.componentTypes.ScrollSlider !== 'undefined')
	App.componentTypes.ScrollSlider.prototype.render = function(DOMNodeId) {
		new App.DelayedDecoration(DOMNodeId, this);
	};
if (typeof App.componentTypes.SlidingPanel !== 'undefined')
	App.componentTypes.SlidingPanel.prototype.render = function(DOMNodeId) {
		new App.DelayedDecoration(DOMNodeId, this);
	};
if (typeof App.componentTypes.ImgPlaceholder !== 'undefined')
	App.componentTypes.ImgPlaceholder.prototype.render = function(DOMNodeId) {
		new App.DelayedDecoration(DOMNodeId, this);
	};