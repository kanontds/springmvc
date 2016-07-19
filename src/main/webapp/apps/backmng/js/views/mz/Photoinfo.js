/**
 * Created by wp on 2015年11月29日
 */


define(['text!mz/Photoinfo-tpl.htm'],function(tpl){
  var photoTpl=_.template(tpl);

  var mySimpleTip=function(options){
    $.messager.show({
      title:'温馨提醒',
      msg:options.msg,
      showType:'show',
      timeout:2000,
      style:{
        right:'',
        top:document.body.scrollTop+document.documentElement.scrollTop,
        bottom:''
      }

    });
  }


  var AllSelectFlag=false;
  var DeleteAreaFlag=true;
  //recovery
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
  require(['GalleriaAction'],function(GalleriaAction){
      GalleriaAction.render(pdata,index);
    });
  }

    return {
      render:function(local,option){

        var localPageNumber, localPageSize;
        var keyword="";
        var initParams=option.initParams;
        var intelligentsearch=[];
        if(initParams){
          intelligentsearch.push({name:'pointid',operate:'=',value:initParams.pointid})
        }
        intelligentsearch.push({name:'status',operate:'=',value:(DeleteAreaFlag?1:-1)});

            var localDataGrid,mynode;
            var refreshGrid=function() {
                //localDataGrid.datagrid('reload');
            };

          //开始

          var pg;
          var fenyeQuery=function(pageNumber, pageSize){
            layer.load();
            intelligentsearch=[];
             intelligentsearch.push({name:'status',operate:'=',value:(DeleteAreaFlag?1:-1)});
            if(initParams){
              intelligentsearch.push({name:'pointid',operate:'=',value:initParams.pointid});
            }
            if(keyword){
              intelligentsearch.push({name:'address',operate:'like',value:'%'+keyword+'%'});
            }

            $.ajax({
              url:'eers/photoinfo',
              data:{
                customtag:'paginationall',
                page:localPageNumber||pageNumber,
                rows:localPageSize||pageSize,
                intelligentsearch:intelligentsearch
              },
              success:function(resp){
                var html=photoTpl({children:resp.rows});
                $('[opt=photoinfos]').html(html);
                pg.pagination('refresh',{total:resp.total,page:1});
                local.find('.photoinfo-img').each(function(index){
                  var me=$(this);
                  me.bind('mouseover',function(){
                    me.find('.photoinfo-menu').show();
                  }).bind('mouseout',function(){
                    me.find('.photoinfo-menu').hide();
                  });
                })
                local.find('.photoinfo-menu').each(function(index){
                  $(this).bind('click',function(){
                    showPhotos(1,'你好世界',resp.rows,index);
                  });

                })
              },
              complete:function(){
                layer.closeAll('loading');
                AllSelectFlag=false;
              }
            })
          }
        local.find('a[opt=recovery-photo-manager]').bind('click',function(){
          DeleteAreaFlag=false;
          var txt=DeleteAreaFlag?"删除":"恢复";
          local.find('.icon-delete-or-undelete').parent().find('.l-btn-text').text(txt);
          fenyeQuery(1,10);
          $(this).parent().children().removeClass('photomng-tab-selected');
          $(this).addClass('photomng-tab-selected');
        })
        local.find('a[opt=delete-photo-manager]').bind('click',function(){
          DeleteAreaFlag=true;
          var txt=DeleteAreaFlag?"删除":"恢复";
          local.find('.icon-delete-or-undelete').parent().find('.l-btn-text').text(txt);
          fenyeQuery(1,10);
          $(this).parent().children().removeClass('photomng-tab-selected');
          $(this).addClass('photomng-tab-selected');

        })


          pg=local.find('[opt=pp]').pagination({
            total:0,
            pageSize:10,
            onSelectPage:function(pageNumber, pageSize){
              localPageSize=pageSize;
              localPageNumber=pageNumber;
              fenyeQuery(pageNumber, pageSize)},
            buttons: [{
              iconCls:'icon-quanxuan',
              text:'全选',
              handler:function(){

                local.find('li.photoinfo-item').each(function(){
                  var photoitem=$(this);
                  if(AllSelectFlag){

                    photoitem.removeClass('photoinfo-selected');
                photoitem.find('input[type=checkbox]').attr('checked',!true);
                  }else{
                    photoitem.addClass('photoinfo-selected');
                photoitem.find('input[type=checkbox]').attr('checked',true);
                  }


                });

                AllSelectFlag=!AllSelectFlag;
              }
            },'-',{
              iconCls:'icon-delete-or-undelete',
              text:'删除',
              //'删除/恢复'
              handler:function(a,b,c){

                var ckeds=$('input[name=deleteme][adopt=0]:checked');
                var ckedslen=ckeds.length;
                if(ckedslen){
                  layer.load();
                  ckeds.each(function(index){
                  $.ajax({
                    url:'eers/photoinfo/'+$(this).val(),
                    type:'put',
                    data:{status:(DeleteAreaFlag?-1:1)},
                    complete:function(){
                      if(index+1==ckedslen){
                        layer.closeAll('loading');
                        fenyeQuery(1,10);
                      }
                    }
                  })

                })
                }else{
                  mySimpleTip({msg:'请选中没有被采纳的图片进行操作！'});
                }


              }
            },'-',{
              iconCls:'icon-flower',
              text:'采纳',
              handler:function(){
                var ckeds=$('input[name=deleteme][adopt=0]:checked');
                var ckedslen=ckeds.length;
                if(ckedslen){
                  layer.load();
                  var data=[];
                  ckeds.each(function(index){
                    data.push($(this).val());
                  });
                  $.ajax({
                    url:'eers/photoinfo-adopt',
                    type:'post',
                    data:{photoids:data.toString(),adopt:1},
                    complete:function(){
                      fenyeQuery(1,10);
                      layer.closeAll('loading');
                    }
                  });

                }
              }
            },'-',{
              iconCls:'icon-caution',
              text:'取消采纳',
              handler:function(){
                var ckeds=$('input[name=deleteme][adopt=1]:checked');
                var ckedslen=ckeds.length;
                if(ckedslen){
                  layer.load();
                  var data=[];
                  ckeds.each(function(index){
                    data.push($(this).val());
                  });
                  $.ajax({
                    url:'eers/photoinfo-adopt',
                    type:'post',
                    data:{photoids:data.toString(),adopt:0},
                    complete:function(){
                      fenyeQuery(1,10);
                      layer.closeAll('loading');
                    }
                  });

                }
              }
            }]
          });
          fenyeQuery(1,10);
          window.setTimeout(function(){pg.pagination('refresh');},1000);

        local.find('.easyui-searchbox-noauto').searchbox({
          searcher:function(value){
            keyword=value;
            fenyeQuery(1,10);
            }
          });

          local.find('ul').bind('click',function(e){
            var tagName=e.target.tagName;
            var photoitem=$(e.target).parents('li');
            if(tagName=='IMG' || tagName=="INPUT"){
              if(!photoitem.hasClass('photoinfo-selected')){
                photoitem.addClass('photoinfo-selected');
                photoitem.find('input[type=checkbox]').attr('checked',true);

              }else{
                photoitem.removeClass('photoinfo-selected');
                photoitem.find('input[type=checkbox]').attr('checked',!true);
              }
            }
          });


        local.find('.photomng-tab').first().addClass('photomng-tab-selected');
          //结果××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××
        }
    }
})
