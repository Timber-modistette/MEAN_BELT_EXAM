var Users = require('../controllers/users');
var Questions = require('../controllers/questions')
var Answers = require('../controllers/answers')
//users routes
module.exports = function(app){
	app.get('/users',Users.index);
	app.post('/users',Users.create);
	app.post('/sessions',Users.login);
	app.get('/users/:id',Users.show);
	app.delete('/users/:id',Users.destroy);
	app.put('/users/:id',Users.update)

	/////////////questions routes/////////////
	app.post('/questions', Questions.create)
	app.get('/questions',Questions.index)
	app.get('/questions/:id', Questions.show)
	app.put('/questions/:id', Questions.updateLikes)

	app.post('/answers', Answers.create);

}
