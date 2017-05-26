app.controller('QuestionsController', function(UserFactory,AnswerFactory,QuestionFactory, $location,$routeParams){
	var self = this;
	self.questions = [];
	self.question = [];

	self.createQuestion = function(newQuestion){
		self.new_question_errors = [];
		UserFactory.session(function(user){
			newQuestion.user = user._id;
			QuestionFactory.createQuestion(newQuestion, function(res){
				// console.log(res)
				if(res.data.errors){
					for(key in res.data.errors){
						var error = res.data.errors[key]
						self.new_question_errors.push(error.message)
					}
				}
				$location.url('/dashboard')
				
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
	self.createAnswer = function(newAnswer){
		// console.log(newAnswer)
		self.new_answer_errors = {};
		newAnswer.question = $routeParams.id
		UserFactory.session(function(user){
			newAnswer.user = user._id;
			AnswerFactory.createAnswer(newAnswer, function(res){
				// console.log(res)
				self.newComment = {};
				if(res.data.errors){
					self.new_answer_errors= [];
					for(key in res.data.errors){
						var error = res.data.errors[key];
						self.new_answer_errors.push(error.message);
					}
				} 
				$location.url('dashboard')
				
			})
		})
		
	}
	self.updateLikes = function(){
		QuestionFactory.updateLikes($routeParams.id,function(res){
			console.log(res)
		})
	}

})
		