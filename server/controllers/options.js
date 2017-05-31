var mongoose = require("mongoose");

var Question = mongoose.model("Question");
var User = mongoose.model('User');
var Option = mongoose.model('Option');


module.exports = {
	updateVotes: function(req, res){
		console.log(req.body);
		Option.findByIdAndUpdate(req.params.id, { $inc: { "votes.count": 1 }}, { new: true }, function(err, option){
			if(err){
				return res.json(err);
			}
			return res.json(option);
		})
	}

};


