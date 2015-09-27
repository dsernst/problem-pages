require('dotenv').load()
var express = require('express')
var app = express()
var cool = require('cool-ascii-faces')
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

app.set('port', process.env.PORT || 5000)

app.get('/', function(req, res) {
  res.end('hello world')
})

app.get('/cool', function(req, res) {
  res.end(cool())
})

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:5000/auth/github/callback',
},
function(accessToken, refreshToken, profile, done) {
console.log(profile)
done()
// User.findOrCreate({ githubId: profile.id }, function (err, user) {
//   return done(err, user)
// })
}))

app.get('/auth/github',
  passport.authenticate('github'))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})

