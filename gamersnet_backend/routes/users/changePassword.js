'use strict';

let bcrypt = require('bcrypt');

let {addUserToken, TOKEN_LIFE_SPAN} = require('../../persistence/tokens');
let generateToken = require('../../utilites/randomString');

async function changePassword(request, response) {
    let body = request.body;
    let cookies = request.get('Cookie');
    
    if (!cookies) {
        response.status(400).end();
    } else {

    }
    //     response.cookie('token', token, {maxAge: TOKEN_LIFE_SPAN, httpOnly: true});
        response.status(204).end();

}

module.exports = changePassword;