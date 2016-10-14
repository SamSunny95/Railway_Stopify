/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

/*
  Artist = describe 'Artist', ->
    property('name', String);
    set 'restPath', pathTo.Artists
*

var Schema = require('jugglingdb').Schema;
var schema = new Schema('mongodb');

var Artist = schema.define('Artist', {
    name:     { type: String }
});
*/

// Import mongoose
var mongoose = require('mongoose');

// need an alias for mongoose.Schema
var Schema = mongoose.Schema;


define('Artist',function(){
	property('name', String);
});


var UserSchema = new Schema;
UserSchema.add({
    name: { type: String },
    password: { type: String },
    email : {type: String}
});
mongoose.model("User", UserSchema);
module.exports["User"] = mongoose.model("User");