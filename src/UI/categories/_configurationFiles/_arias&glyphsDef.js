module.exports = (function(){
	return {
		getArias : function(objType){
			switch(objType) {
				case 'FormComponent' :
					return {
						role : 'form'
					};
				case 'BoolSelector' :
					return {
						role : 'checkbox'
					};
				case 'UsernameInput' :
				case 'PasswordInput' :
				case 'EMailInput' :
				default :
					return {
						
					};
			}
		},
		getGlyphs : function(objType){
			switch(objType) {
				case 'UsernameInput' :
				case 'PasswordInput' :
				case 'EMailInput' :
					return {
						glyphNotvalid : 'glyphicon-ban-circle',
						glyphValid : 'glyphicon-ok'
					};
				case 'picto_Delete' :
					return {
						glyphDelete : 'glyphicon-circle-remove'
					};
				case 'DropZoneOverlay' :
					return {
						glyphHandlesvideo : 'icofont-file-video'
					};
				case 'VaritextButtonWithPictoFirst' :
					return {
						glyphExpanded : 'glyphicon-arrow-down',
						glyphNotexpanded : 'glyphicon-arrow-right',
						glyphBranchintree : 'icofont-box',
						glyphNodeintree : 'icofont-listing-number',
						glyphSortable : 'icofont-sort',
						glyphSortedasc : 'icofont-square-up',
						glyphSorteddesc : 'icofont-square-down',
					};
				case 'SelectInputArrow' : 
					return {
						glyphExpanded : 'glyphicon-arrow-down',
						glyphNotexpanded : 'glyphicon-arrow-right',
					};
				default :
					return null;
			}
		}
	}
})();