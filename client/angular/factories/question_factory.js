app.factory('QuestionFactory', function($http){
	var factory = {};

	factory.createQuestion = function(newQuestion, callback){
		$http.post('/questions', newQuestion).then(callback)
	}
	factory.index = function(callback){
		$http.get('/questions').then(callback)
	}
	factory.showQuestion = function(id,callback){
		// console.log('facotry: ', id)
		$http.get('/questions/'+id).then(callback)
	}
	factory.updateLikes = function(id,callback){
		$http.put('/questions/'+id).then(callback)
	}
	factory.delete = function(questionid,callback){
		$http.delete('/questions/'+questionid).then(callback)
	}	

	return factory;
})