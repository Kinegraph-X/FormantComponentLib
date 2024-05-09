/**
 * @interface droppableInterface
*/
const {TemplateFactory} = require('formantCore');

var inter = function() {}
inter.prototype.objectType = 'droppableInterface';

inter.prototype.queueAsync = function(objectType) {
	return new TemplateFactory.TaskDefinition({
					type : 'viewExtend',
					task : function(definition) {
						const hostDef = definition.getHostDef();
						const newStream = new TemplateFactory.StateModel({'drop-sequence-initialized'  : undefined});
						hostDef.states.push(newStream);
						hostDef.streams.push(newStream);
					}
	});
}

inter.prototype.queueAsyncRegister = function(objectType) {
	return new TemplateFactory.TaskDefinition({
					type : 'lateBinding',
					task : function() {
						const self = this;
						this.view.addEventListener('drop', function(e) {
							e.preventDefault();
							e.stopPropagation();
							self.streams['drop-sequence-initialized'].value = null;
							inter.prototype.readFile(self, e.dataTransfer.files[0]);
						});
						this.view.addEventListener('dragenter', function(e) {
					    	e.preventDefault();
							e.stopPropagation();
							self.streams['drop-sequence-initialized'].value = true;
						});
						this.view.addEventListener('dragleave', function(e) {
					    	e.preventDefault();
							e.stopPropagation();
							self.streams['drop-sequence-initialized'].value = null;
						});
					}
	});
}

inter.prototype.readFile = function(self, file) {
  var reader = new FileReader();
  reader.onloadend = function() {
    self.currentImageData = reader.result;
    self.trigger('update', file);
  }
  reader.readAsDataURL(file);
}



module.exports = inter;