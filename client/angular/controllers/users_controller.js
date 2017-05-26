
app.controller('UsersController', function( UserFactory,$cookies, $location){
	console.log('initializing UsersController.....')
	var self = this;
	self.registration_errors = [];
	self.login_errors = [];
	self.current_user = {};



	self.session = function(){
		UserFactory.session(function(user){
			console.log('user: ', user);
			if(user){
				self.current_user = user;
			} else {
				$location.url('/');
			}
		})
	}

	self.logout = function(){
		$cookies.remove('user_id');
		$location.url('/')
	}




	self.create = function(newUser){
		self.registration_errors = [];
	
		UserFactory.create(newUser,function(res){
			console.log('res',res);
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key];
					self.registration_errors.push(error.message);
				}
			}
			else{
				var user_id = res.data._id;
				$cookies.put('user_id', user_id);
				$location.url('/dashboard')
			}
		})
		
	}
	self.login = function(loginUser){
		self.login_errors = [];
		UserFactory.login(loginUser, function(res){
			if(res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key];
					self.login_errors.push(error.message);
				}

			}
			else{
				$cookies.put('user_id', res.data._id);
				$location.url('dashboard')
			}
		})
	}
	
});









