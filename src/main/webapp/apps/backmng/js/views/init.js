define([],function(){








  $('#logoutaction').bind('click',function(){
    console.log('将要退出系统');
    $.get('/sysapi/logoutaction',function(resp){
      if(resp.logout_status='success'){
        window.setTimeout(function(){
                              var a=window.location.pathname.split('/');
                    var href = '/';
                    window.location.href=href;

        },1000);
      }
    })
  })
})
