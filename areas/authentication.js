var merge = require('merge');

function Authentication(client) {

    this.client = client;
    this._storeAuthData = this._storeAuthData.bind(this);
}

Authentication.prototype.updateAccessToken = function(accessToken) {
    this.client.auth.accessToken = accessToken;
}

Authentication.prototype._storeAuthData = function(authData) {
    this.client.auth.accessToken = authData.access_token;
    this.client.auth.refreshToken = authData.refresh_token;
    this.client.auth.expiresIn = authData.expires_in;
    this.client.auth.scope = authData.scope;
}

Authentication.prototype.authenticate = function(grantType, options) {
    var url = '/oauth/token';

    var params = merge({
        grant_type: grantType
        client_id: this.client.clientId,
        client_secret: this.client.clientSecret
    }, options);


    var req = this.citrix.post(url, params, {});

    req.then(this._storeAuthData);

    return req;
};

Authentication.prototype.refreshAccessToken = function() {

    var url = '/oauth/token';

    var params = {
        grant_type: 'refresh_token',
        refresh_token: this.citrix.auth.refreshToken
    };

    var req = this.client.post(url, params, {
        authHeader: this.authHeader,
        baseUrl: this.baseUrl
    });

    req.then(this._storeAuthData);

    return req;
};

module.exports = Authentication;