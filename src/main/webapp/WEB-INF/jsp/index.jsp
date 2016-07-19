<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="http://120.55.65.150/wp/jquery-easyui-1.4.5/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="http://120.55.65.150/wp/jquery-easyui-1.4.5/themes/icon.css">
    <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
    <script src="http://120.55.65.150/wp/jquery-easyui-1.4.5/jquery.easyui.min.js"></script>
    <script src="http://120.55.65.150/wp/jquery-easyui-1.4.5/locale/easyui-lang-zh_CN.js"></script>


    <title>demo</title>
</head>
<body>



<div class="easyui-layout"  data-options="fit:true">
    <div data-options="region:'north'" style="height:80px">

        <form id="demoForm" action="demo/info" method="post">
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
            <a id="putBtn" href="#">只更新（用put）</a>
            <a id="postUpdateBtn" href="#">只更新（用post）</a>
            <a id="addBtn" href="#">新增</a>
            <a id="deleteBtn" href="#">删除</a>
        </form>

    </div>
    <!--<div data-options="region:'south',split:true" style="height:50px;">
    springmvc+spring+mybaits
    <a href="http://www.mybatis.org/mybatis-3/">http://www.mybatis.org/mybatis-3/</a>
    </div>-->
    <div data-options="region:'west',split:true" title="West" style="width:100px;"></div>
    <div data-options="region:'center',title:'Main Title',iconCls:'icon-ok'">
        <table  id="dg"
                data-options="url:'demo/info',method:'get',pagination:true,border:false,singleSelect:true,fit:true,fitColumns:true">
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
</body>
</html>
<script src="resources/demo.js"></script>
