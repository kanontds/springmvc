package cn.springmvc.model;

import java.util.Date;

public class MoneyInfo {
    private Short mid;

    private String wid;

    private Date mtime;

    private Double money;

    private Short oldid;

    private String mtype;

    public Short getMid() {
        return mid;
    }

    public void setMid(Short mid) {
        this.mid = mid;
    }

    public String getWid() {
        return wid;
    }

    public void setWid(String wid) {
        this.wid = wid == null ? null : wid.trim();
    }

    public Date getMtime() {
        return mtime;
    }

    public void setMtime(Date mtime) {
        this.mtime = mtime;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }

    public String getMtype() {
        return mtype;
    }

    public void setMtype(String mtype) {
        this.mtype = mtype == null ? null : mtype.trim();
    }
}