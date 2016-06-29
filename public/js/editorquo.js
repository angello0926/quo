$( document ).ready(function() {
    var canvawidth = 300;
    var canvaheight = 225;

  function menu(){

 $('#Q').click(function(event) {
    event.stopPropagation();
    $('.Qcontent').removeClass('hidden')
    $('#Q').addClass('focused');
    $('.Ccontent').addClass('hidden')
    $('#C').removeClass('focused');
    $('.Scontent').addClass('hidden')
    $('#S').removeClass('focused');

  });

 $('#C').click(function(event) {
    event.stopPropagation();
    $('.Qcontent').addClass('hidden')
    $('#Q').removeClass('focused');
    $('.Ccontent').removeClass('hidden')
    $('#C').addClass('focused');
    $('.Scontent').addClass('hidden')
    $('#S').removeClass('focused');

  });

  $('#S').click(function(event) {
    event.stopPropagation();
    $('.Qcontent').addClass('hidden')
    $('#Q').removeClass('focused');
    $('.Ccontent').addClass('hidden')
    $('#C').removeClass('focused');
    $('.Scontent').removeClass('hidden')
    $('#S').addClass('focused');
  });

 }

  var stage = new Konva.Stage({
        container: 'container',
        width: canvawidth,
        height: canvaheight

    });

    var layer = new Konva.Layer();
    var bg = new Konva.Rect({
        x: 0,
        y: 0,
        fill: '#F0F0F0',
        width: canvawidth,
        height: canvaheight,
        id:"bg"
    });

     layer.add(bg);
     stage.add(layer);


  function choosefontcolor(){
    $('.color').click(function(event){
     event.stopPropagation();
      var target = $( event.target )
      var color=target.attr('data-color');
      $('.jscolor').val(color);
    });
  }


 function actionAddText(){
   $('#submit').click(function(event) {
          event.stopPropagation();
          var quote=$('#addtext').val();
          choosefontcolor();
          var color=$('.jscolor').val();
          var fontfamily=$('input[name=fontfamily]:checked', '#fontfamily').val();
          var fontsizeT=$('input[name=textsize]:checked', '#fontsize').val();
          switch(fontsizeT) {
          case 'Body Text':
              var fontsize=20;
              break;
          case 'Header Text':
              var fontsize=48;
              break;
          case 'Small Text':
              var fontsize=8;
              break;

          default:
              var fontsize=14;
         }

          generateText(quote,color,fontsize,fontfamily);
    });



 }

 function generateText(quote,color,fontsize,fontFamily){
     var complexText = new Konva.Text({
      x: 20,
      y: 60,
      text: quote,
      fontSize: fontsize,
      fontFamily: fontFamily,
      fill: '#'+color,
      width: 250,
      padding: 10,
      lineHeight:1,
      align: 'left',
      draggable: true

    });


    complexText.on("dragstart", function() {
            this.moveToTop();
            layer.draw();
        });
    complexText.on("dblclick dbltap", function() {
            this.destroy();
            layer.draw();
        });

      layer.add(complexText);
      stage.add(layer);
      $('#addtext').val('');
   }

  function saveimage(){

    document.getElementById('save').addEventListener('click', function() {
      var dataURL = stage.toDataURL();
        //window.open(dataURL);
      $.ajax({
          method: "POST",
          url: "/editor/saveimage",
          data: {
            imgBase64: dataURL,
            '_csrf': $( "meta[name='csrf-token']").attr('content')
          },
          success: function(response){
                        window.location.href = "/editor/addcaption";
                   }
      }, false);
    });
  }



function changeBGcolor(){

  $('.bgcolor').click(function(event){
     event.stopPropagation();
     var target = $( event.target )
     var color1=target.attr('data-color');
     var shape = stage.find('#bg')[0];
     var tween;
      if (tween) {
        tween.destroy();
      }
      tween = new Konva.Tween({
        node: shape,
        fill: color1
      }).play();
   });

  $('#submitcolor').click(function(event) {
   event.stopPropagation();
   var color2=$('.bgowncolor').val();
    var shape = stage.find('#bg')[0];
     var tween;
      if (tween) {
        tween.destroy();
      }
      tween = new Konva.Tween({
        node: shape,
        fill: '#'+color2
      }).play();
  });
}



 function generateRect(){

   $('.square').click(function(event) {
     event.stopPropagation();
    var width=$('#width').val();
    var height=$('#height').val();
    var colors=$('.strokecolor').val();
    var colorf=$('.fillcolor').val();


    var rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: width,
      height: height,
      fill: '#'+colorf,
      stroke: '#'+colors,
      strokeWidth: 4,
      draggable:true
    });

    rect.on("dragstart", function() {
            this.moveToTop();
            layer.draw();
        });
    rect.on("dblclick dbltap", function() {
            this.destroy();
            layer.draw();
        });


    // add the shape to the layer
    layer.add(rect);

    // add the layer to the stage
    stage.add(layer);
});

  }


  function generateCircle(){

   $('.circle').click(function(event) {

    event.stopPropagation();

    var width=$('#width').val();
    var height=$('#height').val();
    var colors=$('.strokecolor').val();
    var colorf=$('.fillcolor').val();

    var circle = new Konva.Ellipse({
      x: 50,
      y: 50,
     radius: {
            x: width,
            y: height
        },
      fill: '#'+colorf,
      stroke: '#'+colors,
      strokeWidth: 4,
      draggable:true
    });

    circle.on("dragstart", function() {
            this.moveToTop();
            layer.draw();
        });
    circle.on("dblclick dbltap", function() {
            this.destroy();
            layer.draw();
        });


    // add the shape to the layer
    layer.add(circle);

    // add the layer to the stage
    stage.add(layer);
});

  }

    function generateTriangle(){

   $('.arrow-up').click(function(event) {

    event.stopPropagation();

    var height=$('#height').val();
    var colors=$('.strokecolor').val();
    var colorf=$('.fillcolor').val();

    var tri = new Konva.RegularPolygon({
      x: 50,
      y: 50,
      sides: 3,
     radius: height,
      fill: '#'+colorf,
      stroke: '#'+colors,
      strokeWidth: 4,
      draggable:true
    });

    tri.on("dragstart", function() {
            this.moveToTop();
            layer.draw();
        });
    tri.on("dblclick dbltap", function() {
            this.destroy();
            layer.draw();
        });


    // add the shape to the layer
    layer.add(tri);

    // add the layer to the stage
    stage.add(layer);
});

  }


 menu();
 choosefontcolor();
 actionAddText();
 saveimage();
changeBGcolor();
generateRect();
generateCircle();
generateTriangle();


});