<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
<title> 你好</title>
</head>
<body>
 ${name }
    <form action="/test/api/products/info" method="post">
         <input type="text" name="pid"/>
         <input type="text" name="pname"/>
         <input type="submit"/>
    </form>
    <input id="aa" type="button" value="保存"/>
     <input id="bb" type="button" value="保存bb"/>
</body>
</html>
<script>

$(function(){
$('#aa').bind('click',function(){
var saveData = {"pid":"aa"}; //发送给服务器的JSON
$.ajax({
  type : "PUT",
  url : "/test/api/products/info.json",
  data:saveData,
  //contentType:"application/json",  //发送至服务器的类型
  dataType : "json",     //预期服务器返回类型
  success: function(data){
   alert(data);
  }

 })
})
})

$(function(){
$('#bb').bind('click',function(){
jQuery.ajax( {
        type : 'GET',
        url : '/test/api/user/list',
        dataType : 'json',
        success : function(data) {
console.log(data);
        },
        error : function() {
          alert("error")
        }
      });
})
})
</script>