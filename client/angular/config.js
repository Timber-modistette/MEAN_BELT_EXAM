var app = angular.module('app', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/user_login_reg.html',
		controller: 'UsersController as UC'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: "UsersController as UC"
	})
	.when('/addQuestion',{
		templateUrl: 'partials/add_question.html',
		controller: 'QuestionsController as QC'
	})
	.when('/showQuestion/:id',{
		templateUrl: 'partials/show_question.html',
		controller: 'QuestionsController as QC'
	})
	.when('/answerQuestion/:id',{
		templateUrl: 'partials/answer_question.html',
		controller: 'QuestionsController as QC'
	})
	.otherwise({redirectTo:'/'})
})