package cn.springmvc.model;

public class ItemInfo {
    private Short iid;

    private Short orgid;

    private String tid;

    private String price;

    private String icontent;

    private Short isdel;

    public Short getIid() {
        return iid;
    }

    public void setIid(Short iid) {
        this.iid = iid;
    }

    public Short getOrgid() {
        return orgid;
    }

    public void setOrgid(Short orgid) {
        this.orgid = orgid;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid == null ? null : tid.trim();
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price == null ? null : price.trim();
    }

    public String getIcontent() {
        return icontent;
    }

    public void setIcontent(String icontent) {
        this.icontent = icontent == null ? null : icontent.trim();
    }

    public Short getIsdel() {
        return isdel;
    }

    public void setIsdel(Short isdel) {
        this.isdel = isdel;
    }
}