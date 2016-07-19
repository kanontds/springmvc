package cn.springmvc.model;

public class FuncInfo1 {
    private Short funcid;

    private String funcname;

    private Short funcparentid;

    private String label;

    private Short sortnum;

    public Short getFuncid() {
        return funcid;
    }

    public void setFuncid(Short funcid) {
        this.funcid = funcid;
    }

    public String getFuncname() {
        return funcname;
    }

    public void setFuncname(String funcname) {
        this.funcname = funcname == null ? null : funcname.trim();
    }

    public Short getFuncparentid() {
        return funcparentid;
    }

    public void setFuncparentid(Short funcparentid) {
        this.funcparentid = funcparentid;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label == null ? null : label.trim();
    }

    public Short getSortnum() {
        return sortnum;
    }

    public void setSortnum(Short sortnum) {
        this.sortnum = sortnum;
    }
}