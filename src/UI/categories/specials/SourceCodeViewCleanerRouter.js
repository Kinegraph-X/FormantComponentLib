/**
 * @module SourceCodeViewRouter 
 */

//var TemplateFactory = require('src/core/TemplateFactory');
const SourceInjectionUtility = require('src/UI/categories/specials/SourceInjectionUtility');
const ComponentTabPanel = require('src/UI/categories/tabs/ComponentTabPanel/ComponentTabPanel');
const tabPanelDefinition = require('src/UI/categories/tabs/TabPanel/componentDefs/TabPanelHostDef');


const {App} = require('formantCore')
const prismCSS = require('css/prism_highlighter_in_code.css');
//const sourceCodeIndex = require('cache/stringifiedSources').sourcesAsStringArrays;

const SourceCodeViewRouter = function(projectKeyword, parentView) {
	const sourceCodeIndex = App.data.stringifiedSources;
	const prismStyleElem = document.createElement('style');
	prismStyleElem.innerHTML = prismCSS;
	
	// We're defining that each time, as it's a complete def hosting a list:
	// The "each" property won't be re-initialized, so we need a new instance each time.
	const defForStyle = tabPanelDefinition();
	defForStyle.lists[0].getHostDef().template.getHostDef().sOverride = [
		{
			selector : ':host tab-header',
			fontSize : '13px',
			lineHeight : '15px',
			height : '28px',
			marginTop : '7px',
			borderRadius : '7px',
			borderWidth : '1px',
			backgroundColor : 'transparent'
		},
		{
			selector : ':host',
			backgroundColor : '#282828'
		}
	];
	
	function init(containerIdOrContainerNode) {
		if (!sourceCodeIndex[projectKeyword]) {
			console.warn('source code for ' + projectKeyword + ' not found');
			return;
		}
		
		let headerTitle = '';
		
		// Instanciate a full panel which shall contain a tab
		// for each source-file embedded in the source-files map
		// by the bundler
		const panelObj = new ComponentTabPanel(defForStyle, parentView);
		
		// Loop on each source file
		sourceCodeIndex[projectKeyword].forEach(function(fileDescObj, key) {
			const prettyDefNameRegex = new RegExp(projectKeyword + '(.*Def.*)', 'i');
			
			// tabKeyword is an empty string, cause we're following the existing signature for "router" functions
			// (this routerMock is called in ComponentSet)
			const routerMock = function(tabKeyword, tabContentView) {
				return {
					init : function() {
						tabContentView.getWrappingNode().appendChild(prismStyleElem.cloneNode(true));
						
						// No real need to define a component's template here
						// as it would be cumbersome to put the Prism stylesheet in DB
						// (see previuous line : we inject it from a in-memory stylesheet)
						var pre = document.createElement('pre');
						var code = document.createElement('code');
						// from the doc of prism.js:
						// the <pre> will automatically get the language-xxxx class (if it doesn’t already have it) and will be styled as a code block.
						pre.className = 'language-javascript';
						code.className = 'language-js';
						pre.appendChild(code);
						
						code.innerHTML = SourceInjectionUtility.prototype.cleanSourceCode(fileDescObj.content);
						tabContentView.getWrappingNode().appendChild(pre);
						Prism.highlightElement(code);
					}
				}
			}
			
			if (fileDescObj.name.match(/Router|Launcher/)) {
				if (sourceCodeIndex[projectKeyword].length > 1)
					headerTitle = 'Launcher';
			}
			else if ((headerTitle = fileDescObj.name.match(prettyDefNameRegex)))
				headerTitle = '{template} ' + headerTitle[0];// + '</i>';
			else
				headerTitle = fileDescObj.name;
			
			// add a tab
			panelObj.addTabForComponent(headerTitle, routerMock);
			
			// Prepare possibility for styling & roughly bind a click event on the tab header
			const lastTabIdx = panelObj._children[0]._children.length - 1;
			panelObj._children[0]._children[lastTabIdx].view.getMasterNode().setAttribute('is-codeviewheader', 'true');
			// Hide enpty headers
			if (!headerTitle.length)
				panelObj._children[0]._children[lastTabIdx].view.getMasterNode().setAttribute('hidden', 'true');
			panelObj._children[0]._children[lastTabIdx].addEventListener('update', function(e) {
				panelObj.ignitePanel(lastTabIdx);
				this.childButtonsHighlightLoop(lastTabIdx);
			}.bind(panelObj._children[0]));
			
			panelObj._children[1]._children[lastTabIdx].view.getMasterNode().setAttribute('is-codeview', 'true');
			
			// ignite the first tab
			if (key === 0)
				panelObj.ignitePanel(key);
		});
	}
	
	return {
		init : init
	}
}

module.exports = SourceCodeViewRouter;