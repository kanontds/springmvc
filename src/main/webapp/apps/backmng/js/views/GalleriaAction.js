define([],function(){
  var gAction=null;
  Galleria.configure({
    imageCrop: !true,
    queue:false,
    transition: 'fade'

  });
  Galleria.loadTheme('js/jqueryplugin/galleria/themes/classic/galleria.classic.min.js');



  $('.galleria').width($(window).width());
  $('.galleria').height($(window).height());

  var b=[];
  var ds= b.length>0?b:[{image:'http://photocdn.sohu.com/20110508/Img307009056.jpg',
                         thumb: 'http://photocdn.sohu.com/20110508/Img307009056.jpg',
                         title: 'my first image',
                         description: '图片未上传，请上传一个图片取代默认的图片'}];


    Galleria.run('.galleria',{dataSource:ds});


    Galleria.ready(function(options) {


      gAction=this;
      $('#mygalleria').bind('click',function(e){
      if($(e.target).hasClass('mygalleria')){
        $(this).removeClass('mygalleria');
      }
      });

            $('.galleria-stage').bind('click',function(e) {
        if($(e.target).hasClass('galleria-image')) {
          $('#mygalleria').removeClass('mygalleria');
        }
      })
      //this.show(index);

    });

  return {
    render:function(data,index){
      var mf=function(){
        gAction.load(data);
        window.setTimeout(function(){
          gAction.show(index);
        },1000);
        try{
          gAction.show(index);
        }catch(exception){

        }


      }
      if(gAction){
        mf();
      }else{
        var timer=window.setInterval(function(){
          if(gAction){
            window.clearInterval(timer);
            mf();
          }
        },100);
      }
      $('#mygalleria').addClass('mygalleria');

    }
  }

})
