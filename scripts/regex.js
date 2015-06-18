define([''], function(undefined){  // no dependencies

	var _fnc = {
		blnNotPrintable:function(paramString){
			return /[\x00-\x1F]/.test(paramString);
		},
		blnIsAlpha:function(paramString, paramIntPosition){
			var UNICODE_FIRST_ALPHA = 65;
			var UNICODE_LAST_ALPHA = 122;
			var unicodeCharVal = paramString.charCodeAt( paramString.charAt(paramIntPosition) );        
			return ( (unicodeCharVal >= UNICODE_FIRST_ALPHA) && (unicodeCharVal <= UNICODE_LAST_ALPHA) );
		},
		blnIsNumeric:function(paramString, paramIntPosition){
			return ( !isNaN( paramString.charAt(paramIntPosition) ) );
		},
		blnIsWhiteSpace:function(paramString){
			return ( /[\x00-\x08\x0E-\x1F]/.test(paramString) );
		},
		blnIsInString:function(paramString, paramStringToFind){
			var reg = new RegExp(paramStringToFind);
			return ( reg.test(paramString) );		
		},
		blnIsParenthesis:function(paramString, paramIntPosition){
			var UNICODE_LEFT = 40;
			var UNICODE_RIGHT = 41;			
			var unicodeCharVal = paramString.charCodeAt( paramString.charAt(paramIntPosition) );        
			return ( (unicodeCharVal === UNICODE_LEFT) || (unicodeCharVal === UNICODE_RIGHT) );
		},
		getIdFromString:function(paramString){
			var reg = /(^|\W)id="(\w+)/g;		
			var arrayReg = reg.exec(paramString);
			var strId = arrayReg[2];
			return strId;
		}
		
	};
	return{
		fnc:_fnc
	};


}); // End define