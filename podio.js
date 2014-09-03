
var Q = require('q'),
	request = require('request');
	merge = require('merge');

	// Areas
	var Authentication = require('./area/authentication');

function Podio(clientId, clientSecret, options) {

	var defaults = {
 		baseUrl = 'https://api.podio.com'
	};

	this.clientId = clientId,
	this.clientSecret= clientSecret,

	this.options = merge(defaults, options);

	this.auth = {
		accessToken : null,
		refreshToken : null,
		expiresIn : 0,
		scope : ''
	}

 	// Initialize areas
 	this.authentication = new Authentication(this);

}

Podio.prototype.post = function(url, data, options) {
	return this.request('post', url, data, options);
}

Podio.prototype.get = function(url, data, options) {
	return this.request('get', url, data, options);
}

Podio.prototype.patch = function(url, data, options) {
	return this.request('patch', url, data, options);
}

Podio.prototype.head = function(url, data, options) {
	return this.request('head', url, data, options);
}

Podio.prototype.put = function(url, data, options) {
	return this.request('put', url, data, options);
}

Podio.prototype.delete = function(url, data, options) {
	return this.request('delete', url, data, options);
}

Podio.prototype.request = function(method, url, data, options) {

	var dfd = new Q.defer();

	if(options.baseUrl) {
		url = options.baseUrl + url;
	}

	var headers = {};

	if(this.auth.accessToken) {
		headers['Authorization'] = 'OAuth2 ' + this.auth.accessToken;
	}

	var reqOptions = {
		url: url,
		headers: headers,
		method: method,
	};

	if( ['post', 'patch', 'put'].indexOf(method) > -1 ) {

		if(options.json === true) {
			reqOptions.json = data;
		} else {
			reqOptions.form = data;
		}

	} else {
		reqOptions.qs = data;
	}

	var sucesss = function(response) {
		if(response.error) {
			dfd.reject(response);
		} else {
			dfd.resolve(response);
		}
	}

	request(reqOptions, function(err, req, response) {

		if (err) {
			dfd.reject(err);
		} else {

			if(typeof response === 'object') { // Data is automaticlly parsed as JSON
				sucesss(response);
			} else {
				parseResponseToJson(response)
					.then(sucesss)
					.fail(dfd.reject);
			}

		}

	});

	return dfd.promise;
}

// Utils

function parseResponseToJson(response) {
	var dfd = new Q.defer();

	try {
		var json = JSON.parse(response);
		dfd.resolve(json);
	} catch(err) {
		dfd.reject(err);
	}

	return dfd.promise;
}


module.exports = Podio;
