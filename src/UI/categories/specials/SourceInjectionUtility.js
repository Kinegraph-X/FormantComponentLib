/**
 * @constructor SourceInjectionUtility
 */

const SourceInjectionUtility = function(rawSources, scopedElement) {
//	console.log(rawSources['stylingBasics'][0].content)
	this.sourcePlaceholderRegEx = /\[Source\:(.*?)(:(.*?))?\]/gi;
	let pageContent = scopedElement.innerHTML;
	
	this.newInnerHTML = '';
	let sourceCursor = 0;
	const sourceNames = Object.keys(rawSources);
	while(sourceCursor < sourceNames.length
			&& (pageContent = this.replaceNextSourcePlaceholder(
				pageContent,
				sourceNames[sourceCursor],
				rawSources[sourceNames[sourceCursor]]
			)
		)) {
		this.newInnerHTML = pageContent;
		sourceCursor++;
	}
}

SourceInjectionUtility.prototype.replaceNextSourcePlaceholder = function(pageContent, currentFlag, sourceCode) {
	let matchedSubFlag = '';
	const matched = Array.from(pageContent.matchAll(this.sourcePlaceholderRegEx));
	let foundFlag = '', foundSubFlag = '', newPageContent = pageContent;
	
	if (matched.length) {
		sourceCode.forEach(function(source, key) {
			matched.forEach(function(match) {
				foundFlag = match[1];
				foundSubFlag = match[3];
//				console.log(foundFlag, currentFlag);
				if (foundSubFlag && foundSubFlag === source.name) {
					newPageContent = this.effectiveReplaceContent(newPageContent, match[0], source.content)
				}
				else if (foundFlag === currentFlag) {
//					console.log(currentFlag);
					newPageContent = this.effectiveReplaceContent(newPageContent, match[0], source.content);
				}
			}, this);
		}, this);
	}
	return newPageContent.length ? newPageContent : pageContent;
}

SourceInjectionUtility.prototype.effectiveReplaceContent = function (pageContent, match, sourceCode) {
	const cleanedCode = this.cleanSourceCode(sourceCode);
	return pageContent.replace(
		match,
		this.highlightSourceCode(
			cleanedCode
		)
	);
}

SourceInjectionUtility.prototype.cleanSourceCode = function (codeAsString) {
	// Multiline comments won't be cought if they're not in the first level of indentation
	// It's a feature: comments inside the code are meant to persist in the doc
	const multilineCommentRegEx = /(\n\r?)+\/\*(.|[\n\r\s])*?\*\//gi;
	const initiatorRegEx = /(\n\r?)+module.exports.*\n?\s*return.*\n?\s*init.*\n*/gi;
	const endingsRegEx = /\s*\}\n?\s*\}\n?\s*\}\n*\s*$/i;
	const indentationRegEx = /^\t{3}/gmi;
	const lastReturnRegEx = /(return\s)(App\.renderDOM\()(\w+)((.|[\n\s])*)$/i;
	
	codeAsString = codeAsString.replace(multilineCommentRegEx, '');
	codeAsString = codeAsString.replace(initiatorRegEx, '');
	codeAsString = codeAsString.replace(endingsRegEx, '');
	codeAsString = codeAsString.replace(indentationRegEx, '');
	return codeAsString.replace(lastReturnRegEx, '$2\'body\'$4');
}

SourceInjectionUtility.prototype.highlightSourceCode = function (codeAsString) {
	const codeElem = document.createElement('code');
	codeElem.innerHTML = codeAsString;
	codeElem.className = 'language-js';
	const preElem = document.createElement('div');
	preElem.appendChild(codeElem);
	Prism.highlightElement(codeElem);
	preElem.className = 'spip_code';
	return preElem.outerHTML;
}

module.exports = SourceInjectionUtility;