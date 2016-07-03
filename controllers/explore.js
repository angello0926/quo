const Post = require('../models/Post');
const User = require('../models/User');

exports.index = (req, res) => {

 Post
 .find({'published':true})
 .populate('_creator')
 .sort({'createdAt':-1})
 .limit(24)
 .exec(function (err, posts) {
   res.render('explore', { title: 'Editor', posts: posts});
  });


}

exports.showpost= (req, res) => {

console.log(req.params)

 Post
 .find({'quote_pic':req.params.data})
 .populate('_creator')
 .exec(function (err, entry) {

  Post.findOne({'quote_pic':req.params.data}, function(err, doc){
    var isInbookmark = doc.bookmarked.some(function (user) {
      return user.equals(req.user._id);
    })
    User.findOne({'_id':req.user.id}, function(err, doc){
      console.log(doc);
       var isInArray = doc.following.some(function(user) {
        console.log(req.params.creator)
        return user.equals(req.params.creator);
    });
    console.log(isInArray);
    console.log(isInbookmark);
    res.send({post: entry, bookmark: isInbookmark, following:isInArray, requser:req.user._id});

    })

  })



  })
}

