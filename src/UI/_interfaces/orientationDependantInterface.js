/**
 * @interface orientationDependantInterface
*/

var inter = function() {}

inter.prototype.resize = function() {
	var self = this;
	setTimeout(function() {
//		if (self.options.orientation === 'horizontal')
//			self.cashElem.width(self.container.width());
//		else
//			self.cashElem.height(self.container.height());
	}, 64);
}

module.exports = inter;