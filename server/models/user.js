var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	first_name:{
		type:String,
		required: [true, "first name is required"],
		maxlength: [100, "first name cannot exceed 100 characters"]
	},
	last_name:{
		type:String,
		required: [true, "last name is required"],
		maxlength: [100, "last name cannot exceed 100 characters"]
	},
	user_name:{
		type:String,
		required: [true, "User name is required"],
		maxlength: [20, "User name cannot exceed 20 characters"],
		unique:true
	},
	email:{
		type:String,
		required: [true, "Email is required"],
		unique:true,
		validate:{
			validator: function(v){
				return /\S*\@\S*\.\S+/g.test(v)
			},
			message: "you must provide a valid email"
		},
		unique:true

	},
	birthday:{
		type:Date,
		required: [true, "birthday is required"]
	},
	password:{
		type:String,
		required: [true, "password is required"]
	},
	questions:[{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Question'
	}]
},{timestamps:true})

UserSchema.methods.hashPassword = function(password){
	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

UserSchema.methods.authenticate = function(password){
	return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function(callback){
	this.hashPassword(this.password);
	callback();
})

mongoose.model('User', UserSchema)