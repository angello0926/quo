const Post = require('../models/Post');
const User = require('../models/User');
var fs     = require("fs");
var uuid   = require('node-uuid');

exports.index = (req, res) => {
  res.render('editor',{title: 'Editor'});
};


exports.postSaveimage = (req, res, next) => {
  var unique = uuid.v1();
  const post1 = new Post({
    quote_pic:unique+".png",
    _creator: req.user.id
  });
  post1.save();
  req.user.posts.push(post1);
  req.user.save();
  var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
  fs.writeFile('./uploads/'+unique+'.png', base64Data, 'base64', function (err) {
    if (err) return next(err);
    console.log('saved');
    res.send({redirect: '/editor_addcaption'});
  })
}


exports.getaddcaption = (req, res) => {
  var quote_pic= String;
  var array= req.user.posts;
  var num=array.length;

  User
  .findOne({'_id': req.user.id})
  .populate('posts')
   .exec(function (err, user) {
  if (err) console.log('fail');
   quote_pic=user.posts[num-1].quote_pic;
   res.render('editor_addcaption',{title:'Editor', quote_pic: quote_pic})

  })

};

exports.submission =(req, res) => {
  var quote_pic= String;
  var array= req.user.posts;
  var num=array.length;
  User
  .findOne({'_id': req.user.id})
  .populate('posts')
  .exec(function (err, user) {
  if (err) console.log('fail');
    quote_pic=user.posts[num-1].quote_pic;
    Post.findOne({ quote_pic: quote_pic}, function (err, doc){
      doc.captions= req.body.caption;
      doc.author=req.body.author;
      doc.title= req.body.title;
      doc.tags=req.body.tags;
      doc.published=true;
      doc.save();
      console.log(doc)
      res.send('success');
   });
 })

}




