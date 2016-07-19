<%@ page import="java.util.Enumeration" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.util.GregorianCalendar" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/7/13
  Time: 14:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>
<%@ page import="org.springframework.cglib.transform.impl.InterceptFieldCallback" %>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="javax.servlet.*,java.text.*" %>
<html>
<head>
    <title>JSP</title>
</head>
<body>
    <%
      out.println("this is jsp page!");
    %>
    <%--jsp声明   <jsp:scriptlet> --%>
   <%!
     private int initVar = 0;
     private int serviceVar = 0;
     private int destroyVar = 0;
   %>

    <%!
      public void jspInit(){
        initVar++;
        System.out.println("jspInit():JSP被初始化了"+ initVar +"次");
      }
      public void jspDestroy(){
        destroyVar++;
        System.out.println("jspDestroy():JSP被销毁了 "+ destroyVar +"次");
      }
    %>
<%--脚本程序  <jsp:declaration> --%>
    <%
      serviceVar++;
      System.out.println("_jspService():JSP共响应了"+ serviceVar +"次");

      String content1 = "初始化次数：" + initVar;
      String content2 = "响应客户请求次数：" + serviceVar;
      String content3 = "销毁次数：" + destroyVar;
    %>

    <h1>JSP 生命周期测试实例</h1>
    <p><%=content1%></p>
    <p><%=content2%></p>
    <p><%=content3%></p>

<%
  out.println("Your IP address is " + request.getRemoteAddr());
%>

<%--jsp指令--%>
    <%--<%@ page ... %>	定义页面的依赖属性，比如脚本语言、error页面、缓存需求等等--%>
    <%--<%@ include ... %>	包含其他文件--%>
    <%--<%@ taglib ... %>	引入标签库的定义，可以是自定义标签--%>

<%! int day = 3; %>
<h3>IF...ELSE 实例</h3>
<% if (day == 1 | day==7) { %>
  <p>今天是周末</p>
<% }else { %>
  <p>今天是工作日</p>
<% } %>

    <h3>SWITCH...CASE 实例</h3>
    <%
      switch(day) {
        case 0:
          out.println("星期天");
          break;
        case 1:
          out.println("星期一");
          break;
        case 2:
          out.println("星期二");
          break;
        case 3:
          out.println("星期三");
          break;
        case 4:
          out.println("星期四");
          break;
        case 5:
          out.println("星期五");
          break;
        default:
          out.println("星期六");
      }
    %>

    <%! int fontSize; %>
    <h3>For 循环实例</h3>
    <%for ( fontSize = 1; fontSize <= 3; fontSize++){ %>
    <font color="green" size="<%= fontSize %>">
      for循环
    </font><br />
    <%}%>


    <h3>While 循环实例</h3>
    <%while ( fontSize <= 6){ %>
    <font color="green" size="<%= fontSize %>">
      while循环
    </font><br />
    <%fontSize++;%>
    <%}%>


    <p>
      今天的日期是: <%= (new java.util.Date()).toLocaleString()%>
    </p>

    <h2>Jsp 使用 JavaBean 实例</h2>
    <jsp:useBean id="tds" class="cn.servlet.tds.bean.JavaBean" />
    <jsp:setProperty name="tds" property="name" value="使用 javaBean" />
    <jsp:getProperty name="tds" property="name" />


    <h2>HTTP 头部请求实例</h2>
    <table width="100%" border="1" align="center">
      <tr bgcolor="#949494">
        <th>Header Name</th>
        <th>Header Value(s)</th>
      </tr>
      <%
        Enumeration headerNames = request.getHeaderNames();
        while(headerNames.hasMoreElements()){
          String paramName = (String) headerNames.nextElement();
          out.print("<tr><td>" + paramName + "</td>\n");
          String paramValue = request.getHeader(paramName);
          out.print("<td>" + paramValue + "</td></tr>\n");
        }
      %>
    </table>


<h2>自动刷新实例</h2>
<%
  //设置每隔5秒自动刷新
//  response.setIntHeader("Refresh",5);
  //获取当前时间
  Calendar calendar = new GregorianCalendar();
  String ap;
  int hour = calendar.get(Calendar.HOUR);
  int minute = calendar.get(Calendar.MINUTE);
  int second = calendar.get(Calendar.SECOND);
  if (calendar.get(Calendar.AM_PM) == 0){
    ap = "AM";
  }else{
    ap = "PM";
  }
  String CT = hour + ":" + minute + ":" + second + " " + ap;
  out.println("当前时间：" + CT + "\n");

%>

<%--<%--%>
<%--//    获取session创建时间--%>
    <%--Date createtTime = new Date(session.getCreationTime());--%>
<%--//    获取最后访问页面的时间--%>
    <%--Date lastAccessTime = new Date(session.getLastAccessedTime());--%>

    <%--String title = "Session示例 再次访问";--%>
    <%--Integer visitCount = new Integer(0);--%>
    <%--String visitCountKey = new String("visitCount");--%>
    <%--String userIDKey = new String("userID");--%>
    <%--String userID = new String("ABCD");--%>

<%--//    检测网页是否由新的用户访问--%>
    <%--if (session.isNew()){--%>
        <%--title = "Session示例 首次访问";--%>
        <%--session.setAttribute(userIDKey,userID);--%>
        <%--session.setAttribute(visitCountKey,visitCount);--%>
    <%--}else{--%>
        <%--visitCount = (Integer)session.getAttribute(visitCountKey);--%>
        <%--visitCount += 1;--%>
        <%--userID = (String)session.getAttribute(userIDKey);--%>
        <%--session.setAttribute(visitCountKey,  visitCount);--%>
    <%--}--%>


<%--%>--%>

<%--<h1>Session 跟踪</h1>--%>
<%--<table border="1" align="center">--%>
    <%--<tr bgcolor="#949494">--%>
        <%--<th>session Message</th>--%>
        <%--<th>value</th>--%>
    <%--</tr>--%>
    <%--<tr>--%>
        <%--<td>id</td>--%>
        <%--<td><% out.print(session.getId());%></td>--%>
    <%--</tr>--%>
    <%--<tr>--%>
        <%--<td>创建时间</td>--%>
        <%--<td><% out.print(createtTime);%></td>--%>
    <%--</tr>--%>
    <%--<tr>--%>
        <%--<td>最后访问时间</td>--%>
        <%--<td><% out.print(lastAccessTime);%></td>--%>
    <%--</tr>--%>
    <%--<tr>--%>
        <%--<td>用户 ID</td>--%>
        <%--<td><% out.print(userID);%></td>--%>
    <%--</tr>--%>
    <%--<tr>--%>
        <%--<td>访问次数</td>--%>
        <%--<td><% out.print(visitCount);%></td>--%>
    <%--</tr>--%>

<%--</table>--%>

    <div class="easyui-layout"  data-options="fit:true">
        <div data-options="region:'north'" style="height:80px">
            <form id="demoForm" action="/test/api/demo/info" method="post">
                dtime:<input class="easyui-datetimebox" name="dtime"
                             data-options="required:true,showSeconds:false" value="3/4/2010 2:3" style="width:150px">
                地址:<input type="text" name="place"/>
                内容:<input type="text" name="content"/>
                <br>
                <input type="text" name="mytext1"/>
                <input type="text" name="mytext2"/>
                <input type="text" name="mytext3"/>
                <input type="text" name="mytext4"/>
                <input type="text" name="mytext5"/>
                <input type="text" name="mytext6"/>
                <input type="text" name="mytext7"/>
                <input type="text" name="mytexttest"/>
                <a id="submitBtn" href="#">提交</a>
                <a id="addBtn" href="#">新增</a>
                <a id="deleteBtn" href="#">删除</a>
            </form>
        </div>

        <div data-options="region:'west',split:true" title="West" style="width:100px;"></div>
        <div data-options="region:'center',title:'Main Title',iconCls:'icon-ok'">
            <table  id="dg"
                    data-options="url:'/test/api/demo/info',method:'get',pagination:true,border:false,singleSelect:true,fit:true,fitColumns:true">
                <thead>
                <tr>
                    <th data-options="field:'id'" width="80">Item ID</th>
                    <th data-options="field:'dtime'" width="100">dtime</th>
                    <th data-options="field:'place',align:'right'" width="80">地址</th>
                    <th data-options="field:'content',align:'right'" width="80">内容</th>
                    <th data-options="field:'mytext1',align:'right'" width="80">mytext1</th>
                    <th data-options="field:'mytext2',align:'right'" width="80">mytext2</th>
                    <th data-options="field:'mytext3',align:'right'" width="80">mytext3</th>
                    <th data-options="field:'mytext4',align:'right'" width="80">mytext4</th>
                    <th data-options="field:'mytext5',align:'right'" width="80">mytext5</th>
                    <th data-options="field:'mytext6',align:'right'" width="80">mytext6</th>
                    <th data-options="field:'mytext7',align:'right'" width="80">mytext7</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>

 <h1>显示当前时间与日期</h1>
<%
    Date aNow = new Date();
    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    out.print("<h2 align = \"center\">" + ft.format(aNow) + "</h2>");
%>

    <%--<h1>页面重定向</h1>--%>

    <%--<%--%>
        <%--// 重定向到新地址--%>
        <%--String site = new String("http://www.runoob.com");--%>
        <%--response.setStatus(response.SC_MOVED_TEMPORARILY);--%>
        <%--response.setHeader("Location", site);--%>
    <%--%>--%>

<%
    Integer hitsCount = (Integer) application.getAttribute("hitCounter");
    if(hitsCount== null || hitsCount == 0){
        out.println("首次访问！");
        hitsCount = 1;
    }else{
        out.println("再次访问");
        hitsCount = hitsCount + 1;
    }
    application.setAttribute("hitCounter",hitsCount);
%>
<p>页面访问量：<%= hitsCount%></p>
</body>
</html>
