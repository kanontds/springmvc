package cn.springmvc.model;

import java.util.Date;

public class MonitorInfo {
    private Short mid;

    private Short oldid;

    private String mname;

    private Double num;

    private Date mtime;

    public Short getMid() {
        return mid;
    }

    public void setMid(Short mid) {
        this.mid = mid;
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname == null ? null : mname.trim();
    }

    public Double getNum() {
        return num;
    }

    public void setNum(Double num) {
        this.num = num;
    }

    public Date getMtime() {
        return mtime;
    }

    public void setMtime(Date mtime) {
        this.mtime = mtime;
    }
}