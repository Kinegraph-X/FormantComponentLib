/**
 * @interface jsParserInterface
*/

const {TemplateFactory} = require('formantCore');
var commonUtilities = require('src/core/commonUtilities');

var meriyah = require('meriyah');
var estraverse = require('estraverse');
var codegen = require('astring');

var inter = function() {
	this.createEvent('ASTcleaned');
}
inter.prototype.constructor = inter;
inter.prototype.objectType = 'jsParserInterface';

inter.prototype.queueAsyncRegister = function() {
	var error = null;
	var jsAST;
	var generatedCode;
	
	return new TemplateFactory.TaskDefinition({
		type : 'lateBinding',
		task : function(definition) {
			this.addEventListener(
				'update',
				// We should more likely use "debounce" here:
				// => no execution until the end of keyboard typing sequence
				commonUtilities.debounce(function(e) {
					if (!e.data.textContent)
						return;
					
					error = null;
					try {
						_ASThandler.estraverseInstance = null;
						jsAST = meriyah.parseScript(
							e.data.textContent,
							{
								specDeviation : true
							});
						
						estraverse.replace(jsAST, {
							enter : function(node, parent) {
								
								if (!_ASThandler.estraverseInstance) {
									_ASThandler.estraverseInstance = this;
	//								console.log(_ASThandler.estraverseInstance);
								}
	//							console.log(node.type);
								_ASThandler._handleNode(node, parent);
							},
							leave : function(node, parent) {
								_ASThandler._handleMemberExpression(node, parent);
								return _ASThandler._checkForUnwantedNullValues(node, parent);
							}
						});
//						console.log(jsAST);

						generatedCode = codegen.generate(
								jsAST,
								{
									indent : '	'
								}
							);
						
					}
					catch (e) {
//						console.log('Caught JS parsing error');
						error = ['Exception caught while generating the AST', e];
					}
					
					if (error || !jsAST || !jsAST.body[0].expression) {
						console.warn('JS AST cleaning error: it may contain prohibited code, or may even not be JS', jsAST, error);
						return;
					}
					
					this.trigger('ASTcleaned', {
							stringifiedScript : generatedCode,
							startsWithFunction : jsAST.body[0].expression.type === 'CallExpression' ? true : false
						});
				}, 704, this)
			);
		}
	});
}

var _ASThandler = {
	estraverseInstance : null,
	isNestedInMemberExpression : false,
	shouldRemoveParent : false
};

_ASThandler._handleNode = function(node, parent) {
	
	this._handleReturnValue(
		this._enterMemberExpression(node, parent)
			|| this._handleFunctionDeclaration(node, parent)
			|| this._handleFunctionExpression(node, parent)
			|| this._handleCallExpression(node, parent)
	);
}

_ASThandler._enterMemberExpression = function(node, parent) {
	if (node.type === 'MemberExpression') {
		this.isNestedInMemberExpression = true;
	}
}

_ASThandler._handleMemberExpression = function(node, parent) {
	if (node.type === 'MemberExpression') {
		if (this.shouldRemoveParent && this.isNestedInMemberExpression) {
			this._handleReturnValue('remove');
			this.shouldRemoveParent = false;
		}
		this.isNestedInMemberExpression = false;
	}
}

_ASThandler._handleFunctionDeclaration = function(node, parent) {
	if (node.type === 'FunctionDeclaration') {
		return this._isKnownFunction(node);
	}
}

_ASThandler._handleFunctionExpression = function(node, parent) {
	if (node.type === 'FunctionExpression') {
		return this._isKnownParent(node, parent);
	}
}

_ASThandler._handleCallExpression = function(node, parent) {
	if (node.type === 'CallExpression') {
		return this._isKnownFunction(node);
	}
}

_ASThandler._isKnownFunction = function(functionNode) {
//	console.log(functionNode);
	if (!functionNode.callee.object && functionNode.callee.type !== 'Identifier')
		return 'remove';
	else {
		// TODO: callee.object.callee indicates that there's a possibility
		// that the nesting has a depth of "n": traversing this should be handled recursively
		var identifier = (functionNode.callee.type === 'Identifier' && functionNode.callee.name)
							|| functionNode.callee.object.name
							|| functionNode.callee.object.callee.name;
		
		if (services.knownTypes.indexOf(identifier) === -1) {
			
			// Debug log
			// TODO: handle that at debug symbols automation level
			console.warn('The function call:', identifier, 'has been removed from user-defined JS code for security reasons.');
			
			this.shouldRemoveParent = true;
			return 'remove';	
		}
	}
}

_ASThandler._isKnownParent = function(functionNode, parent) {
	// Debug log
	// TODO: handle that at debug symbols automation level
	if (parent.key && services.knownIdentifiers.indexOf(parent.key.name) === -1)
		console.warn('The anonymous function call relative to:', parent.key.name, 'has been removed from user-defined JS code for security reasons.');
	
	if ((!parent.key || parent.key.type !== 'identifier') || services.knownIdentifiers.indexOf(parent.key.name) === -1) {
		return 'remove';
	}
}

_ASThandler._handleReturnValue = function(returnValue) {
//	console.log(returnValue);
//	console.log(this.estraverseInstance);
	if (typeof services.nodeFilters[returnValue] === 'function') {
		services.nodeFilters[returnValue].call(this.estraverseInstance);
	}
}

_ASThandler._checkForUnwantedNullValues = function(node, parent) {
//	console.log(returnValue);
//	console.log(this.estraverseInstance);
	if (node.type !== 'Literal' && node.value === null) {
		node.value = {
			type : 'Literal',
			value : null
		};
		return node;
	}
}

var services = {
	knownTypes : [
		'TypeManager',
		'CreateStyle',
		'DF',
		'AppUtils'
	],
	knownIdentifiers : [
//		'map'
	],
	nodeFilters : {
		remove : estraverse.Controller.prototype.remove
	}
}

module.exports = inter;