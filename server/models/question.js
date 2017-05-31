
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	content:{
		type: String,
		required: [true, 'Question field cannot be blank'],
		minlength: [8, " survey Question cannot be less than 8 characters"]
	},
	options:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Option'
	}]
	
}, {timestamps: true})

mongoose.model('Question', QuestionSchema);