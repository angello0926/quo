exports.index = (req, res) => {

  if(req.user && req.user.email!==undefined){
    res.redirect('/home');
  }

  if(req.user && req.user.email===undefined){
    res.redirect('/email');
  }


  res.render('Welcome',{
    title: 'WELCOME!' });
};


exports.email = (req, res) => {

  if(req.user && req.user.email!==undefined){
    res.redirect('/home');
  }

  res.render('email',{
    title: 'Email Register' });
};

