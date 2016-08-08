package cn.springmvc.model;

import java.util.Date;

public class RelativInfo {
    private Short rid;

    private String dvcode;

    private String rtelnum;

    private String rpwd;

    private Date rtime;

    public Short getRid() {
        return rid;
    }

    public void setRid(Short rid) {
        this.rid = rid;
    }

    public String getDvcode() {
        return dvcode;
    }

    public void setDvcode(String dvcode) {
        this.dvcode = dvcode == null ? null : dvcode.trim();
    }

    public String getRtelnum() {
        return rtelnum;
    }

    public void setRtelnum(String rtelnum) {
        this.rtelnum = rtelnum == null ? null : rtelnum.trim();
    }

    public String getRpwd() {
        return rpwd;
    }

    public void setRpwd(String rpwd) {
        this.rpwd = rpwd == null ? null : rpwd.trim();
    }

    public Date getRtime() {
        return rtime;
    }

    public void setRtime(Date rtime) {
        this.rtime = rtime;
    }
}