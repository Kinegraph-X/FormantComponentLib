/**
 * @interface locallySavableInputInterface
*/
const {TemplateFactory} = require('formantCore');

var inter = function() {}
inter.prototype.objectType = 'locallySavableInputInterface';

inter.prototype.queueAsyncRegister = function(objectType) {
	return new TemplateFactory.TaskDefinition({
					type : 'lateBinding',
					// requires that the component has a "savableStore" property
					task : function() {
						if (!this.savableStore)
							return;
						
						const DOMInputName = this.view.getMasterNode().title;
						this.savableStore.addValue(DOMInputName);
							
						const self = this;
						this.addEventListener('update', function(e) {
							self.savableStore.update(DOMInputName, self.getValue());
						});
					}
	});
}



module.exports = inter;