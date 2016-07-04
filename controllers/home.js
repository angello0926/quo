const Post = require('../models/Post');
const User = require('../models/User');

exports.index = (req, res) => {
  var arraypost= req.user.posts;
  var num_p=arraypost.length;
  var following=req.user.following;
  var num_f=following.length;
  var followers= req.user.followers;
  var num_ff=followers.length;

User
  .findOne({'email': 'angelyy@gmail.com'})
  .exec(function (err, user) {
  if (err) console.log('fail');
    user.profile.name= "LO YUK YU";
    user.save();
    console.log(user);
  });


  Post
  .find({'_creator': req.user.id})
  .sort({'createdAt':-1})
  .exec(function (err, posts) {

   res.render('home', {
    title: 'Home', json: posts , postno: num_p , subscribe: num_f , followers: num_ff});

  })



};


