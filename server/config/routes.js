var Users = require('../controllers/users');
var Questions = require('../controllers/questions')
var Options = require('../controllers/options')

module.exports = function(app){
	//////////user routes//////////////
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
	app.delete('/questions/:id',Questions.destroy)
	
	//////////options routes////////////////
	app.put('/options/:id',Options.updateVotes)

}
