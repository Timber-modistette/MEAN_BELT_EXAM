app.factory("OptionFactory", function($http){
	var factory = {};

	factory.updateVotes = function(optionid,callback){
		// console.log(optionid)
		$http.put('/options/'+optionid).then(callback)
	}


	return factory;
})