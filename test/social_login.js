var Citrix = require('../citrix');

var ctxs = new Citrix({
	consumerKey: 'bcefe12d-b1ec-4b5e-8545-f4ef3037b3c5',
	consumerSecret: '2Wh3UDjiyHV8IC3YDs+Bng=='
});

var auth = ctxs.authentication.authenticateWithSocial('facebook', 'CAAVXYi2SmTkBAADhYer8qtRVGSaJZBiosn46L3rGet6GnN9nZCpAaP08ZAUZABVjahO9PbZClE2q8mmfo2EywScEEGDa6vcfHm2YzteBqhYuGHWhSBmLBKZBqKauidKhuoTeRMtwSfcoZBXO89ca5bfpspeKNtfA7ooqV6CWm5WiRFKmd32KdeguP6yoZAOPYBuGw4mB9HyLCgZDZD');

auth.then(function(authData) {

	var usr = ctxs.identity.me();

	usr.then(function(user) {
		console.log('user', user);
	});

	usr.fail(function(err){
		console.log('user.failed', err);
	});

});

auth.fail(function(err){
	console.log('auth failed', err);
});

