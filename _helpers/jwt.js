const expressJwt = require('express-jwt');
var config = require('./config');



function jwt() {
    return expressJwt({secret: config.secret}).unless({
        path: [
            // public routes that don't require authentication
            '/users/register',
            '/users/login',
            '/category/getallcategories',
            '/newsfeed/getpostsbycategoryname',
            '/suggestion/getallsuggestions',
            '/suggestion/getpostsbysuggestionname',
        ]
    },function (err, req, res, next) {
        if (err.code === 'invalid_token') return next();
        return next(err);});
}
module.exports = jwt;