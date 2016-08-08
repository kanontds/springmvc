package cn.springmvc.model;

public class TypeInfo {
    private String tid;

    private String parentid;

    private String tname;

    private Short depth;

    private String dvcode;

    private Short isdel;

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid == null ? null : tid.trim();
    }

    public String getParentid() {
        return parentid;
    }

    public void setParentid(String parentid) {
        this.parentid = parentid == null ? null : parentid.trim();
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname == null ? null : tname.trim();
    }

    public Short getDepth() {
        return depth;
    }

    public void setDepth(Short depth) {
        this.depth = depth;
    }

    public String getDvcode() {
        return dvcode;
    }

    public void setDvcode(String dvcode) {
        this.dvcode = dvcode == null ? null : dvcode.trim();
    }

    public Short getIsdel() {
        return isdel;
    }

    public void setIsdel(Short isdel) {
        this.isdel = isdel;
    }
}