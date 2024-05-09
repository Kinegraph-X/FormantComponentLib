/**
 * @interface dbFedComponentInterface
*/

//const {TypeManager} = require('formantCore');
//
//const {TemplateFactory} = require('formantCore');
//const {Registries} = require('formantCore');


var inter = function() {
	this.acquiredTypeIsArray = this.acquiredTypeIsArray || false;
	this.propToAcquireFromDBType = this.propToAcquireFromDBType;
	
	if (!this.propToAcquireFromDBType) {
		console.error(inter.prototype.objectType, 'this.propToAcquireFromDBType could not be defined: this interface has no use, you should remove it.')
	}
}
inter.prototype.constructor = inter;
inter.prototype.objectType = 'dbFedComponentInterface';

inter.prototype.adaptDBTypedValue = function(valueFromDB) {
//	console.log(valueFromDB, valueFromDB[this.propToAcquireFromDBType]);
	if (this.acquiredTypeIsArray) {
		return valueFromDB.map(function(item) {
			return item[this.propToAcquireFromDBType];
		}, this);
	}
	else if (Array.isArray(valueFromDB))
		return valueFromDB[this._key][this.propToAcquireFromDBType];
	else
		return  valueFromDB[this.propToAcquireFromDBType];
}

module.exports = inter;