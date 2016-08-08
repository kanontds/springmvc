package cn.springmvc.model;

public class Configure {
    private Short cid;

    private String cname;

    private String cvalue;

    private String cident;

    private Short csort;

    private String cstate;

    private Short isdel;

    public Short getCid() {
        return cid;
    }

    public void setCid(Short cid) {
        this.cid = cid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname == null ? null : cname.trim();
    }

    public String getCvalue() {
        return cvalue;
    }

    public void setCvalue(String cvalue) {
        this.cvalue = cvalue == null ? null : cvalue.trim();
    }

    public String getCident() {
        return cident;
    }

    public void setCident(String cident) {
        this.cident = cident == null ? null : cident.trim();
    }

    public Short getCsort() {
        return csort;
    }

    public void setCsort(Short csort) {
        this.csort = csort;
    }

    public String getCstate() {
        return cstate;
    }

    public void setCstate(String cstate) {
        this.cstate = cstate == null ? null : cstate.trim();
    }

    public Short getIsdel() {
        return isdel;
    }

    public void setIsdel(Short isdel) {
        this.isdel = isdel;
    }
}