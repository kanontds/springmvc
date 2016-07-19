//*后台管理页JS函数，Jquery扩展

////屏蔽右键
//document.oncontextmenu = function () { return false };

////禁止F5 以及 Ctrl+R 刷新
//document.onkeydown = function(e) {
//    if ($.browser.msie) {
//        if (event.keyCode == 116 || ((event.ctrlKey) && (event.keyCode == 82))) {
//            event.keyCode = 0;
//            //阻止IE事件冒泡
//            event.cancelBubble = true;
//            event.returnvalue = false;
//            return false;
//        }
//    } else {
//        if (e.which == 116 || ((e.ctrlKey) && (e.which == 82))) {
//            return false;
//        }
//    }
//};

//var Sys = { };
//var ua = navigator.userAgent.toLowerCase();
//if (window.ActiveXObject)
//    Sys.ie = ua.match(/msie ([\d.]+)/)[1];
//else if (document.getBoxObjectFor)
//    Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
//else if (window.MessageEvent && !document.getBoxObjectFor)
//    Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
//else if (window.opera)
//    Sys.opera = ua.match(/opera.([\d.]+)/)[1];
//else if (window.openDatabase)
//    Sys.safari = ua.match(/version\/([\d.]+)/)[1];

//////以下进行测试
////if (Sys.ie) alert('IE: ' + Sys.ie);
////if (Sys.firefox) alert('Firefox: ' + Sys.firefox);
////if (Sys.chrome) alert('Chrome: ' + Sys.chrome);
////if (Sys.opera) alert('Opera: ' + Sys.opera);
////if (Sys.safari) alert('Safari: ' + Sys.safari);

//if (Sys.chrome == null) {
//    alert("为了使您的使用体验更好，请用 Gooogle Chrome 浏览系统！");
//    window.top.location.replace('/Invalid.aspx');
//}

/************************************* javascript global *******************************************************************/
var mmid = getQueryStringByName('mmid');

$(document).ready(function () {
    $("form").keypress(function (e) {
        if (e.which == 13) {
            return false;
        }
    });

    //core form validate | set default validate
    if ($.validator != undefined && $.validator != null) {
        $.validator.setDefaults({
            errorElement: "span",
            errorPlacement: function (error, element) {
                $(element).closest("div.validate").append(error);
                $(element).closest("div.validate").append("<i class='form-control-feedback glyphicon glyphicon-remove'></i>");
            },
            errorClass: "help-block m-b-none",
            highlight: function (element) {
                $(element).closest('div.validate').removeClass('has-feedback has-success').addClass('has-feedback has-error');
                $(element).closest('div.validate').find('i.glyphicon').removeClass('glyphicon-ok').addClass('glyphicon-remove');
            },
            unhighlight: function (element) {
                $(element).closest('div.validate').removeClass('has-feedback has-error').addClass('has-feedback has-success');
                $(element).closest('div.validate').find('i.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok');
            },
            success: function (lable) {
                lable.closest('div.validate').find('i.glyphicon').removeClass('glyphicon-remove').addClass('glyphicon-ok');
            }
        });
    }

    //替换特殊符号
    //    $("input[type='text']").blur(function () {
    //        $(this).val(ReplaceSpecial($(this).val()));
    //        if ($(this).hasClass("contact")) {
    //            $(this).valid();
    //        }
    //    });
});

/************************************** Plugin Core Func *********************************************************************/
/* Alert ( type: info| warning | success | error ; title : msg title ; info : msg content ) */
function QAlert(info, msgtype) {
    // Clears the current list of toasts
    toastr.clear();
    switch (msgtype) {
        case "info":
            toastr.info(info, "提示");
            break;
        case "warning":
            toastr.warning(info);
            break;
        case "success":
            toastr.success(info, "成功");
            break;
        case "error":
            toastr.error(info, "异常");
            break;
        default:
            toastr.info(info, "提示");
            break;
    }
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
}

//confirm msg
function QConfirm(title, info, fun) {
    if (typeof (fun) === "function") {
        top.dialog({
            title: title,
            content: info,
            cancel: false,
            button: [
                {
                    value: '确定',
                    callback: function () {
                        fun();
                    },
                    autofocus: true
                },
                {
                    value: '取消',
                    callback: function () {
                        QAlert('您取消了操作！', 'info');
                    }
                }]
        }).showModal();
    }
}

//Open Win
//Func Instructions：custom size
//Return : dialog object
function OpenWin(width, height, title, url, isModel, canMove, canClose, Id) {
    //show loading
    top.Layout.startLoading(2);

    var bMove = false;
    if (canMove == true)
        bMove = true;

    if (Id == undefined || Id == "") {
        Id = getWinId();
    }

    if ( url.indexOf('mmid')<0 && mmid != "") {
        if (url.toString().indexOf('?') > 0)
            url += "&mmid=" + mmid;
        else
            url += "?mmid=" + mmid;
    }

    //Open Index.aspx
    var dialogWin = null;

    if (canClose == false) {
        dialogWin = top.dialog({ id: Id, title: title, url: url, width: width, height: height, fixed: bMove, cancel: false, oniframeload: function () { top.Layout.stopLoading(); }, onclose: function () { top.Layout.stopLoading(); } });
    }
    else {
        dialogWin = top.dialog({ id: Id, title: title, url: url, width: width, height: height, fixed: bMove, oniframeload: function () { top.Layout.stopLoading(); }, onclose: function () { top.Layout.stopLoading(); } });
    }

    if (isModel == true) {
        dialogWin.showModal();
    }
    else {
        dialogWin.show();
    }

    return dialogWin;
}

//Open Win
//Func Instructions：auto size
//Return : dialog object
function OpenWinAuto(title, url, isModel, canMove, canClose, Id) {

    //show loading
    top.Layout.startLoading(2);

    var thiswith = window.top.document.body.scrollWidth - 100;
    var thisheight = window.top.document.body.scrollHeight - 150;

    var bMove = false;
    if (canMove == true)
        bMove = true;

    if (Id == undefined || Id == "") {
        Id = getWinId();
    }

    if ( url.indexOf('mmid')<0 && mmid != "") {
        if (url.toString().indexOf('?') > 0)
            url += "&mmid=" + mmid;
        else
            url += "?mmid=" + mmid;
    }

    //Open Index.aspx
    var dialogWin = null;

    if (canClose == false) {
        dialogWin = top.dialog({ id: Id, title: title, url: url, width: thiswith, height: thisheight, fixed: bMove, cancel: false, oniframeload: function () { top.Layout.stopLoading(); }, onclose: function () { top.Layout.stopLoading(); } });
    }
    else {
        dialogWin = top.dialog({ id: Id, title: title, url: url, width: thiswith, height: thisheight, fixed: bMove, oniframeload: function () { top.Layout.stopLoading(); }, onclose: function () { top.Layout.stopLoading(); } });
    }

    if (isModel == true) {
        dialogWin.showModal();
    }
    else {
        dialogWin.show();
    }

    return dialogWin;
}

//高亮显示label
//参数说明
//返回html
function QLabel(info, type, title, isClose) {
    var strHtml = "";
    var close = '<button type="button" class="close" data-dismiss="alert">&times;</button>';
    switch (type) {
        case "warning":
            strHtml = '<div class="alert alert-warning alert-block">' + (isClose == null || isClose == undefined || isClose == false ? "" : close) + '<h4><i class="fa fa-bell-alt"></i>' + (title == null || title == undefined || title == "" ? "提示" : title) + '</h4><p>' + info + '</p></div>';
        case "error":
            strHtml = '<div class="alert alert-danger alert-block">' + (isClose == null || isClose == undefined || isClose == false ? "" : close) + '<h4><i class="fa fa-bell-alt"></i>' + (title == null || title == undefined || title == "" ? "提示" : title) + '</h4><p>' + info + '</p></div>';
            break;
        case "success":
            strHtml = '<div class="alert alert-success alert-block">' + (isClose == null || isClose == undefined || isClose == false ? "" : close) + '<h4><i class="fa fa-bell-alt"></i>' + (title == null || title == undefined || title == "" ? "提示" : title) + '</h4><p>' + info + '</p></div>';
            break;
        case "info":
        default:
            strHtml = '<div class="alert alert-info alert-block">' + (isClose == null || isClose == undefined || isClose == false ? "" : close) + '<h4><i class="fa fa-bell-alt"></i>' + (title == null || title == undefined || title == "" ? "提示" : title) + '</h4><p>' + info + '</p></div>';
            break;
    }
    return strHtml;
}

/************************************* javascript functions ********************************************************/
function refresh() {
    top.Layout.refresh();
}

//主框架跳转到指定页面
//action：页面进入动画 ( fadeIn,fadeInUp,fadeInDown,fadeInLeft,fadeInRight,fadeInUpBig ,fadeInLeftBig , fadeInRightBig
//  fadeOut ,fadeOutUp ,fadeOutDown , fadeOutLeft , fadeOutRight , fadeOutUpBig , fadeOutDownBig , fadeOutLeftBig
//  fadeOutRightBig )，url：页面主框架全地址
function GotoUrl(url, action) {
    top.Layout.redirect(url, action);
}

//指定框架跳转到指定页面
//action：页面进入动画 ( fadeIn,fadeInUp,fadeInDown,fadeInLeft,fadeInRight,fadeInUpBig ,fadeInLeftBig , fadeInRightBig
//  fadeOut ,fadeOutUp ,fadeOutDown , fadeOutLeft , fadeOutRight , fadeOutUpBig , fadeOutDownBig , fadeOutLeftBig
//  fadeOutRightBig )，url：当前相对页面地址
function GotoUrlTarget(url, target, action) {
    if ($("#" + target).length == 0)
        parent.Layout.redirectandtarget(url, target, action);
    else
        Layout.redirectandtarget(url, target, action);
}

//loading 动画
function StartPageLoading() {
    var loading = "<div id='zloading'><div class='loader3'>{0}</div></div>";
    var span = "";
    for (var i = 0; i < 5; i++) {
        span += "<div class='rect" + (i + 1) + "'></div>";
    }
    loading = loading.format(span);
    $("#zloading").remove();
    $("body").append(loading);
}

//移除当前页面loading
function StopPageLoading() {
    $("#zloading").remove();
}

//可以自动关闭的提示*
function jsprint(msgtitle, url, msgcss, callback) {
    switch (msgcss) {
        case "Success":
            QAlert(msgtitle, "success");
            break;
        case "Error":
            QAlert(msgtitle, "error");
            break;
        default:
            QAlert(msgtitle);
            break;
    }

    if (url != "") {
        location.href = url;
    }

    //执行回调函数
    if (typeof (callback) == "function") callback();
}

//可以自动关闭的提示
function parentjsprint(msgtitle, url, msgcss, callback) {
    jsprint(msgtitle, url, msgcss, callback);
}

/*
 * 继承权限跳转
 */
function inheritTansfer(url) {
    if (mmid != "") {
        if (url.toString().indexOf('?') > 0)
            url += "&mmid=" + mmid;
        else
            url += "?mmid=" + mmid;
    }

    location.href = url;
}

//全选取消按钮函数，调用样式如：
function checkAll(chkobj) {
    if ($(chkobj).text().indexOf("全 选") != -1) {
        $(chkobj)[0].innerHTML = "<i class='fa fa-edit'></i>&nbsp;取 消";
        //切换状态
        $("input.checkall").checkbox("check");
    } else {
        $(chkobj)[0].innerHTML = "<i class='fa fa-edit'></i>&nbsp;全 选";
        //切换状态
        $("input.checkall").checkbox("uncheck");
    }
}

//获取随机
function getRandom(n) {
    return Math.floor(Math.random() * n + 1);
}

//随机WinID
function getWinId() {
    return new Date().format("yyyyMMddhhmmss") + "_r" + getRandom(100);
}

/**
 * 函数名：长度填充
 * 编写人：OrangeKing
 * 函数说明：长度填充，前缀填充
 * @param str 待判定的字符串
 * @param char 填充的字符
 * @param len 填充长度
 * @return：返回填充后字符串
 */
function fillbefore(str, char, len) {
    while (str.length < len) {
        str = char + str;
    }

    return str;
}

/**
 * 函数名：防止SQL注入
 * 编写人：OrangeKing
 * 函数说明：防止SQL注入
 * @param oField 待验证的字符串
 * @return：返回验证是否通过
 */
function antiSqlValid(oField) {
    re = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    if (re.test(oField.value)) {
        //art.dialog.alert("请您不要在参数中输入特殊字符和SQL关键字！");
        alert("请您不要在参数中输入特殊字符和SQL关键字！"); //注意中文乱码
        $(oField).closest('.input-group').addClass('validate-has-error'); ;
        $(oField).focus();
        $(oField).select();
        return false;
    } else {
        $(oField).closest('.input-group').removeClass('validate-has-error');
        return true;
    }
}

/*
 * 随机字符串
 * 编写人：OrangeKing
 * length:字符串长度
 */
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

/*
 * 字符串转换为Json对象
 * Written By 王超 At 2012-12-26
 */
function strToJson(str) {
    var json = eval('(' + str + ')');
    return json;
}

//获取QueryString的数组
function getQueryString() {
    var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
    if (result == null) {
        return "";
    }
    for (var i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
    }
    return result;
}

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

//根据QueryString参数索引获取值
function getQueryStringByIndex(index) {
    if (index == null) {
        return "";
    }
    var queryStringList = getQueryString();
    if (index >= queryStringList.length) {
        return "";
    }
    var result = queryStringList[index];
    var startIndex = result.indexOf("=") + 1;
    result = result.substring(startIndex);
    return result;
}

//替换特殊符号
function ReplaceSpecial(s) {
    var pattern = new RegExp("[`!#$^&*()=|{}';',\\[\\]<>?！#￥……&*（）;—|{}【】‘；”“'。，、？\"%｛｝《》\"]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 函数名：计算字符串长度
 * 函数说明：计算字符串长度，半角长度为1，全角长度为2
 * @param str 字符串
 * @return 字符串长度
 */
function getStrLen(str) {
    var len = 0;
    var i;
    var c;
    for (var i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        if (isDbcCase(c)) { //半角
            len = len + 1;
        } else { //全角
            len = len + 2;
        }
    }
    return len;
}


/*
 * 监测号码是否为手机号
 * 编写人：QinKer
 * 返回值：true 是手机号，false不是手机号
 *
 */
function CheckPhoneNumber(str) {
    var reg = /1[3458]{1}\d{9}$/;
    if (reg.test(str)) {
        return true;
    }
    else {
        return false;
    }
}