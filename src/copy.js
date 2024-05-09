module.exports = function (grunt, options) {
	// example using options.currentProject as an alternative to the self expanding string mechanism '<%=currentProject%>'
		
	var authorName = new RegExp(options.baseAuthorName, 'gi'),
		baseWord = new RegExp(options.baseWord, 'gi'),
		componentWord = new RegExp(options.componentWord, 'gi');
	
	return {
		newPackageComponent: {
			expand: true,
			cwd: '<%=pathToTemplate%>',
			src: [
				'**'
				],
			dest: '<%=pathToDest%>',
			rename : function(dest, src) {
				if (src.match(baseWord))
					src = src.replace(baseWord, '<%=componentName%>');
				return dest + src;
			},
			options :{
				process : function(content, srcpath) {
					if (srcpath.match(/(.+\.js([on]{2})?)$/)) {
						content = content.replace(authorName, options.projectVendor);
						content = content.replace(componentWord, options.componentName);
					}
					return content;
				}
			}
		}
	};
}