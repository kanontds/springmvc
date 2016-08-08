package cn.springmvc.model;

public class MedicineInfo {
    private Short medid;

    private String medname;

    private Double dose;

    private Short hyid;

    private Short oldid;

    public Short getMedid() {
        return medid;
    }

    public void setMedid(Short medid) {
        this.medid = medid;
    }

    public String getMedname() {
        return medname;
    }

    public void setMedname(String medname) {
        this.medname = medname == null ? null : medname.trim();
    }

    public Double getDose() {
        return dose;
    }

    public void setDose(Double dose) {
        this.dose = dose;
    }

    public Short getHyid() {
        return hyid;
    }

    public void setHyid(Short hyid) {
        this.hyid = hyid;
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }
}