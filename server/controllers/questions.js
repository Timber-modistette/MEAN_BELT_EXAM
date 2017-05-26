var mongoose = require("mongoose");
var User = mongoose.model('User')
var Question = mongoose.model("Question");
var Answer = mongoose.model('Answer')


module.exports = {
	index: function(req, res){
		Question.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'answers',
			model: 'Answer',
			options: { sort: { createdAt: 1 }},
			populate: {
				path: 'user',
				model: 'User'
			}
		}).sort('-createdAt').exec(function(err, questions){
			if(err){
				return res.json(err);
			}
			return res.json(questions);
		})
	},
	create: function(req, res){
		Question.create(req.body, function(err, question){
			if(err){
				return res.json(err);
			}
			User.findByIdAndUpdate(req.body.user, { $push : { questions: question._id }}, function(err, user){
				if(err){
					return res.json(err);
				}
				return res.json(question);
			})
		})
	},
	show: function(req ,res){
		Question.findById(req.params.id).populate({
			path:'user',
			model:'User'
		}).populate({
			path:'answers',
			model:'Answer',
			populate:{
				path:'user',
				model:'User'
			}
		}).sort().exec(function(err,question){
			if(err){
				return res.json(err)
			}
			return res.json(question)
		})
	},
	destroy: function(req, res){
		Question.findByIdAndRemove(req.params.id, function(err,question){
			if(err){
				return res.json(err)
			}
			return res.json(question)
		})
	},
	updateLikes: function(req, res){
		console.log(req.body);
		Question.findByIdAndUpdate(req.params.id, { $inc: { "likes.count": 1 }, $push: { "likes.users": req.body.user }}, { new: true }, function(err, question){
			if(err){
				return res.json(err);
			}
			return res.json(question);
		})
	}
};
