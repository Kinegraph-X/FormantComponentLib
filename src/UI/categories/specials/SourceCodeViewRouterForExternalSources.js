/**
 * @module SourceCodeViewRouter 
 */

const {App} = require('formantCore');
const prismCSS = require('css/prism_highlighter_in_code.css');
//const sourceCodeIndex = require('cache/stringifiedSources').sourcesAsStringArrays;
const sourceCodeIndex = App.data.stringifiedSources;

var SourceCodeViewRouter = function() {
	var prismStyleElem = document.createElement('style');
	prismStyleElem.innerHTML = prismCSS;
	
	function init(containerIdOrContainerNode) {
		return function(projectKeyword, parentView) {
			
			var headerTitle;
			var panelObj = new App.componentTypes.TabPanel(null, parentView);
			
			
			for (let projectName in sourceCodeIndex) {
				if (projectName === projectKeyword) {
					sourceCodeIndex[projectName].forEach(function(fileDescObj) {

						var prettyDefNameRegex = new RegExp(projectKeyword + '(.*Def.*)', 'i');
						var routerMock = {
								init : function(parentView) {
									parentView.getRoot().append(prismStyleElem.cloneNode(true));
									
									var pre = document.createElement('pre');
									var code = document.createElement('code');
									pre.className = 'language-javascript';
									code.className = 'language-javascript';
									pre.appendChild(code);
									code.innerHTML = fileDescObj.content;
									parentView.getRoot().append(pre);
								}
						}
						if (fileDescObj.name.match(/Router/))
							headerTitle = 'Launcher';
						else if ((headerTitle = fileDescObj.name.match(prettyDefNameRegex)))
							headerTitle = '{definition} <i>' + headerTitle[1].slice(-10) + '</i>';
						else
							return;
						
						panelObj.addTabForComponent(headerTitle, routerMock);
						
						// Moving-on Styling & Rough click event binding on the tab header
						var lastTabIdx = panelObj._children[0]._children.length - 1;
						panelObj._children[0]._children[lastTabIdx].view.getMasterNode().setAttribute('is-codeviewheader', 'true');
						panelObj._children[1]._children[lastTabIdx].view.getMasterNode().setAttribute('is-codeview', 'true');
						panelObj._children[0]._children[lastTabIdx].addEventListener('update', function(e) {
							panelObj.ignitePanel(lastTabIdx);
							this.childButtonsHighlightLoop(lastTabIdx);
						}.bind(panelObj._children[0]));
					});
				}
			}
		};
	}
	
	return {
		init : init
	}
}

module.exports = SourceCodeViewRouter();