app.factory("AnswerFactory", function($http){
	var factory = {};

	factory.createAnswer = function(newAnswer, callback){
		$http.post('/answers', newAnswer).then(callback)
	}


	return factory;
})