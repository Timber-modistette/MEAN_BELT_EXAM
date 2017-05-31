var mongoose = require("mongoose");

var OptionSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, 'option cannot be blank.'],
		minlength: [3, 'option must be at least 5 characters']
	},
	question: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Question'
	},
	votes: {
		count: {
			type: Number,
			default: 0
		}
	}
	
}, { timestamps: true });

mongoose.model('Option',OptionSchema);