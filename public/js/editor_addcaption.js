 $( document ).ready(function() {
         function submit(){
            $('#submit').click(function(event) {
              event.stopPropagation();
              var caption=$('#addcaption').val();
              console.log(caption);
              var author=$('#addauthor').val();
              var title=$('#addtitle').val();
              var tags=$('#addtags').val();
              $.ajax({
                  method: "POST",
                  url: "/editor/submit",
                  data: {
                  caption: caption,
                  author: author,
                  title: title,
                  tags: tags,
                  '_csrf': $( "meta[name='csrf-token']").attr('content')
                  },
                  success: function(response){
                    if('success')
                     window.location.href = "/home";
                }
            }, false);
          });
        }

        submit();
   });