app.controller('QuestionsController', function(UserFactory,OptionFactory,QuestionFactory, $location,$routeParams){
	var self = this;
	self.questions = [];
	self.question = [];

	self.createQuestion = function(newQuestion, option1,option2,option3,option4){
		self.new_question_errors = [];
		if(!newQuestion){
			newQuestion = {};
		}
		var list = [option1,option2,option3,option4]
		console.log(list)
		newQuestion.myOptions = list;
		UserFactory.session(function(user){
			newQuestion.user = user._id;
			QuestionFactory.createQuestion(newQuestion, function(res){
				console.log(res)
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key]
						self.new_question_errors.push(error.message)
					}
				}
				else{
					$location.url('/dashboard')
					
				}
				
			})
		})
	}
	self.index = function(){
		QuestionFactory.index(function(res){
			// console.log(res)
			self.questions = res.data;
		})
	}
	self.showQuestion = function(){
		// console.log( 'route: ', $routeParams)
		QuestionFactory.showQuestion($routeParams.id,function(res){
			self.question = res.data;
			console.log(res)
		})
	}
	self.updateVotes = function(optionid){
		// console.log(optionid)
		OptionFactory.updateVotes(optionid,function(res){
			self.showQuestion()
		})
	}
	self.cancel = function(){
		$location.url('dashboard')
	}
	self.delete = function(questionid){
		// console.log(questionid)
		QuestionFactory.delete(questionid, function(res){
			console.log(res)
			self.index()
		})
	}

})
		