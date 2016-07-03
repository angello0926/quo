const Post = require('../models/Post');
const User = require('../models/User');
var glob = require("glob");
var fs = require("fs");

exports.delete = (req, res) => {
  var quoteFilename=req.body.quoteFilename;
  console.log(quoteFilename)
   Post
   .findOne({'quote_pic': quoteFilename })
   .exec(function (err, post){
      var objid=post._id;
      User.update({ _id: req.user.id }, {$pullAll: {posts: [objid ]}}).exec(function(err,data){
        post.remove();
        res.send('success');
      });
      glob("uploads/"+quoteFilename,function(err,files){
        if (err) throw err;
          files.forEach(function(item,index,array){
            console.log(item + " found");
            fs.unlink(item, function(err){
              if (err) throw err;
              console.log(item + " deleted");
            });
          });
      });
    });

};
