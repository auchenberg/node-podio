var Citrix = require('../citrix');

var ctxs = new Citrix({
	consumerKey: '844aff69-ecd8-4d80-8036-a18ec068e8ba',
	consumerSecret: 'Iz+jn1HKcNwidU/vCVwyEQ=='
});

var auth = ctxs.authentication.authenticateWithClient();

auth.then(function(authData) {

	console.log('auth.success', authData);

	var userData = {

	};

	ctxs.identity.create('kenneth@auchenberg.dk', userData).then(function(user) {
		console.log('user.created', user);
	}).fail(function(err) {
		console.log('user.create.failed', err);
	})
	
});

auth.fail(function(err){
	console.log('auth.failed', err);
});

