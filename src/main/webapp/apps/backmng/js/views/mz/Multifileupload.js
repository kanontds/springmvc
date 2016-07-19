//多文件上传功能
define([], function () {

    var uploadify_onSelectError = function(file, errorCode, errorMsg) {
        var msgText = "上传失败\n";
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                msgText += "文件大小为0";
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                break;
            default:
                msgText += "错误代码：" + errorCode + "\n" + errorMsg;
        }
        alert(msgText);
    };


var uploadify_onSelect = function(){

};

  var uploadify_onUploadSuccess = function(file, data, response) {
    console.log(file);
    console.log(data);
    console.log(response);
};

  var render=function(local,opt){
    console.log(opt);
    if(!opt.formDataObj){
      opt.formDataObj={parent_name: "上级的东西"};
    }

    mylocal=local;
    console.log(local.find("#uploadify-gongwen"));
        var multifilebtn=local.find("#uploadify-gongwen");
        multifilebtn.uploadify({
            fileObjName:'myfile',
            'swf': 'js/jqueryplugin/uploadify/uploadify.swf',
            'uploader': 'eers/attachment',
            'buttonText': '选择文件',
            //[myfile parentid deptid parent_name aliasname docketno
                'formData': $.extend({},opt.formDataObj,{parent_name:encodeURI(opt.formDataObj.parent_name)})/*{
             parentid:1208,deptid:1208,parent_name:encodeURI('测试')
             }*/,
            //上传文件页面中，你想要用来作为文件队列的元素的id, 默认为false  自动生成,  不带#
            //'queueID': 'fileQueue',
            'auto': !true,
            'multi': true,
            queueID: 'fileQueue-gongwen',
            height: 27,
            wmode: 'transparent',
          onUploadComplete: function (event, queueID, fileObj, response, data) {

            },
            onError: function (event, queueID, fileObj) {
                //alert("文件:" + fileObj.name + " 上传失败");
            },
            onUploadStart: function (file) {
            },
          onQueueComplete: function () {
                if(opt.callback_onQueueComplete){
                    opt.callback_onQueueComplete();
                }
            },
            'overrideEvents' : [ 'onDialogClose', 'onUploadSuccess', 'onSelectError' ],
            'onSelect' : uploadify_onSelect,
            'onSelectError' : uploadify_onSelectError,
          'onUploadSuccess' : function(file,data,response){
            if(opt.callback_onUploadSuccess){
              opt.callback_onUploadSuccess(data);
            }
          }
        });




    local.find('a[action=upload]').bind('click',function(){
            multifilebtn.uploadify('upload','*');
        })
    }





    return {
        render: render
    }
})
