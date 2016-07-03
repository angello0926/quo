const Post = require('../models/Post');
const User = require('../models/User');

exports.index = (req, res) => {

 Post
 .find({'bookmarked': req.user._id})
 .sort({'createdAt':-1})
 .exec(function (err, posts) {

  res.render('bookmark', { title: 'Bookmark', posts: posts});
  });


};


exports.addbookmark= (req, res) => {
  console.log(req.params)
  Post.findOne({'quote_pic':req.params.picname}, function(err, doc){
    var isInArray = doc.bookmarked.some(function (user) {
      return user.equals(req.user._id);
    });

    if(!isInArray){
      User.findOneAndUpdate({'_id':req.user._id},{$push: { bookmarked: doc }}, {new: true}, function(err, doc){
      console.log(doc);
    });

      Post.findOneAndUpdate({'quote_pic':req.params.picname},{$push: { bookmarked:req.user}}, {new: true}, function(err, doc){
      console.log(doc);
      var data=doc.bookmarked.length;
      console.log(data);
      res.send({bookmark_no:data, bookmark: true});
    });

   }else {

     User.findOneAndUpdate({'_id':req.user._id},{$pullAll: {bookmarked: [doc._id] }}, {new: true}, function(err, doc){
      console.log(doc);
    });

      Post.findOneAndUpdate({'quote_pic':req.params.picname},{$pullAll: { bookmarked: [req.user._id]}}, {new: true}, function(err, doc){
      console.log(doc);
      var data=doc.bookmarked.length;
      console.log(data);
       res.send({bookmark_no:data, bookmark: false});
    });

   }

});

};