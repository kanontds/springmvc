package cn.springmvc.model;

import java.util.Date;

public class MsgInfo {
    private Short msgid;

    private Short orgid;

    private String msgcontent;

    private Date msgtime;

    public Short getMsgid() {
        return msgid;
    }

    public void setMsgid(Short msgid) {
        this.msgid = msgid;
    }

    public Short getOrgid() {
        return orgid;
    }

    public void setOrgid(Short orgid) {
        this.orgid = orgid;
    }

    public String getMsgcontent() {
        return msgcontent;
    }

    public void setMsgcontent(String msgcontent) {
        this.msgcontent = msgcontent == null ? null : msgcontent.trim();
    }

    public Date getMsgtime() {
        return msgtime;
    }

    public void setMsgtime(Date msgtime) {
        this.msgtime = msgtime;
    }
}