package cn.springmvc.model;

public class ContactsInfo {
    private Short ciid;

    private Short oldid;

    private String contactname;

    private String contacttel;

    public Short getCiid() {
        return ciid;
    }

    public void setCiid(Short ciid) {
        this.ciid = ciid;
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }

    public String getContactname() {
        return contactname;
    }

    public void setContactname(String contactname) {
        this.contactname = contactname == null ? null : contactname.trim();
    }

    public String getContacttel() {
        return contacttel;
    }

    public void setContacttel(String contacttel) {
        this.contacttel = contacttel == null ? null : contacttel.trim();
    }
}