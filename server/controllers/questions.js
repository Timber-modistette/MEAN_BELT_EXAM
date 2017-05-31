var mongoose = require("mongoose");
var User = mongoose.model('User')
var Question = mongoose.model("Question");
var Option = mongoose.model('Option')


module.exports = {
	index: function(req, res){
		Question.find({}).populate({
			path: 'user',
			model: 'User'
		}).populate({
			path: 'options',
			model: 'Option',
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
		console.log(req.body)
		Question.create(req.body, function(err,question){
			if(err){
				return res.json(err)
			}
			console.log('creating question...')
			var option1 = new Option(req.body.myOptions[0])
			option1.question = question._id
			option1.save(function(err,option1){
				if(err){
					return res.json(err)
				}
				console.log('creating option1...')
				question.options.push(option1._id)
				question.save(function(err,question){
					if(err){
						return res.json(err)
					}
					var option2 = new Option(req.body.myOptions[1])
					option2.question = question._id
					option2.save(function(err,option2){
						if(err){
							return res.json(err)
						}
						console.log('creating option2...')
						question.options.push(option2._id)
						question.save(function(err,question){
							if(err){
								return res.json(err)
							}
							var option3 = new Option(req.body.myOptions[2])
							option3.question = question._id
							option3.save(function(err,option3){
								if(err){
									return res .json(err)
								}
								question.options.push(option3._id)
								question.save(function(err,question){
									if(err){
										return res.json(err)
									}
									var option4 = new Option(req.body.myOptions[3])
									option4.question = question._id
									option4.save(function(err,option4){
										if(err){
											return res.json(err)
										}
										question.options.push(option4._id)
										question.save(function(err,question){
											if(err){
												return res.json(err)
											}
											User.findByIdAndUpdate(req.body.user, {$push:{questions:question._id}}, {new:true}, function(err,user){
												if(err){
													return res.json(err)
												}
												return res.json(user)
											})
										})
									})
								})
							})
						})
					})

				})
			})
		})
	},
	show: function(req ,res){
		Question.findById(req.params.id).populate({
			path:'user',
			model:'User'
		}).populate({
			path:'options',
			model:'Option',
			options:{sort: {'votes.count':-1}},
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
	}
	// destroy: function(req, res){
	// 	Question.findByIdAndRemove(req.params.id, function(err,question){
	// 		if(err){
	// 			return res.json(err)
	// 		}
	// 		return res.json(question)
	// 	})
	// }
};
