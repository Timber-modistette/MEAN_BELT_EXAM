var mongoose = require("mongoose");

var AnswerSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		required: [true, 'Comment cannot be blank.'],
		minlength: [5, 'answer must be at least 5 characters']
	},
	description:{
		type:String,

	},
	question: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	},
	count:{
		type:Number,
		default:0
	}
}, { timestamps: true });

mongoose.model('Answer', AnswerSchema);