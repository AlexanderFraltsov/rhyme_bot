(
	function(exports){
		exports.hello=function(){
			console.log("helloworld");
		};
	}
)(typeof exports === 'undefined'? this['Config']={}: exports);
