define([],function(){
  var showGalleria=function(data,index){
    require(['GalleriaAction'],function(GalleriaAction){
      GalleriaAction.render(data,index);
    });
  }
  var showPhotos=function(id,title,data,index){
    var pdata=[];
    for(var i in data){
      var pic=data[i];
      pdata.push({
        pid:pic.photoid,
        src:'eers/'+pic.photopath,
        image: 'eers/'+pic.photopath,
        thumb:'eers/'+pic.thumbpath
      })
    }
    showGalleria(pdata,index);

  }
  var go2PhotoMng=function(p,id){
    p.trigger('close');
    require(['Tabs'], function (js) {
      js.ShowContent({
        htmfile: "text!mz/Photoinfo.htm",
        jsfile: "mz/Photoinfo",
        title: "图片管理"+id,
        initParams:{pointid:id}
      });

    })
  }
  var render=function(local,record,parent){

    $.ajax({
      url:'eers/photoinfo',
      data:{
        customtag:'nopaginationall',
        intelligentsearch:[{name:'pointid',operate:'=',value:record.pointid},{name:'status',operate:'=',value:1}]
      },
      success:function(resp){
        var photoArea=local.find('[opt=photo]');
        for(var i in resp){
          photoArea.append('<img src="eers/'+resp[i].thumbpath+'" width="140px" height="100px">');
        }

        photoArea.find('img').each(function(index){
          $(this).bind('click',function(){
            showPhotos(record.pointid,'你好世界',resp,index);
          })
        })
        if(!resp.length){
          photoArea.append('无图片')
        }else{
          local.find('[action=photomng]').bind('click',function(){
            go2PhotoMng(parent,record.pointid);
          })
        }

      }
    });




    $.ajax({
      url:'eers/voiceinfo',
      data:{
        customtag:'nopaginationall',
        intelligentsearch:[{name:'pointid',operate:'=',value:record.pointid}]
      },
      success:function(resp){
        var voiceArea=local.find('[opt=voice]');
        if(!resp.length){
          voiceArea.append('无语音');
        }else{
          local.find('[action=play]').show().bind('click',function(){
            local.find('audio').attr('src','eers/'+resp[0].voicepath).get(0).play();
          })
        }

      }
    })
  }


  return {
    render:render
  }
})
