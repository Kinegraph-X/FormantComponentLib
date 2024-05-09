/**
 * @interface webStorageOnUpdate
*/

const {TemplateFactory} = require('formantCore');
var commonUtilities = require('src/core/commonUtilities');


var inter = function() {
	this.localStorageName = 'thisShouldNotBeLeftAsDefault';
}
inter.prototype.constructor = inter;
inter.prototype.objectType = 'webStorageOnUpdate';

inter.prototype.queueAsyncRegister = function() {
	
	return new TemplateFactory.TaskDefinition({
		type : 'lateBinding',
		task : function(definition) {
//			console.log('interface called');
			var self = this;
			this.addEventListener(
				'update',
				commonUtilities.debounce(function(e) {
					if (self.localStorageName === 'thisShouldNotBeLeftAsDefault') {
						console.warn(self.objectType, 'WebStorageUpdateInterface : this.localStorageName is "thisShouldNotBeLeftAsDefault". Returning...');
						return;
					}
						
//					console.log('callback called', e.data.textContent);
					localStorage.setItem(self.localStorageName, e.data.textContent);
//					console.log(localStorage.getItem('rawContentFromOnUpdateInterface'));
				}, 2048)
			);
		}
	 });
}

module.exports = inter;