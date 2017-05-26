
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	content:{
		type: String,
		required: [true, 'Name field cannot be blank'],
		minlength: [10, "Question cannot be less than 10 characters"]
	},
	description: {
		type: String,
	},
	likes: {
		count: {
			type: Number,
			default: 0
		},
		users: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}]
	},
	answers:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Answer'
	}]
}, {timestamps: true})

mongoose.model('Question', QuestionSchema);