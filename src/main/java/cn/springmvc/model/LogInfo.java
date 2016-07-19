package cn.springmvc.model;

import java.util.Date;

public class LogInfo {
    private Short logid;

    private Short userid;

    private String logcontent;

    private Date logtime;

    private String tb;

    public Short getLogid() {
        return logid;
    }

    public void setLogid(Short logid) {
        this.logid = logid;
    }

    public Short getUserid() {
        return userid;
    }

    public void setUserid(Short userid) {
        this.userid = userid;
    }

    public String getLogcontent() {
        return logcontent;
    }

    public void setLogcontent(String logcontent) {
        this.logcontent = logcontent == null ? null : logcontent.trim();
    }

    public Date getLogtime() {
        return logtime;
    }

    public void setLogtime(Date logtime) {
        this.logtime = logtime;
    }

    public String getTb() {
        return tb;
    }

    public void setTb(String tb) {
        this.tb = tb == null ? null : tb.trim();
    }
}