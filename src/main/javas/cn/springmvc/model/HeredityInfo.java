package cn.springmvc.model;

public class HeredityInfo {
    private Short heredityid;

    private String hypertension;

    private String hyperlipemiars;

    private String diabetes;

    private String coronary;

    private String cerebrovascular;

    private Short oldid;

    public Short getHeredityid() {
        return heredityid;
    }

    public void setHeredityid(Short heredityid) {
        this.heredityid = heredityid;
    }

    public String getHypertension() {
        return hypertension;
    }

    public void setHypertension(String hypertension) {
        this.hypertension = hypertension == null ? null : hypertension.trim();
    }

    public String getHyperlipemiars() {
        return hyperlipemiars;
    }

    public void setHyperlipemiars(String hyperlipemiars) {
        this.hyperlipemiars = hyperlipemiars == null ? null : hyperlipemiars.trim();
    }

    public String getDiabetes() {
        return diabetes;
    }

    public void setDiabetes(String diabetes) {
        this.diabetes = diabetes == null ? null : diabetes.trim();
    }

    public String getCoronary() {
        return coronary;
    }

    public void setCoronary(String coronary) {
        this.coronary = coronary == null ? null : coronary.trim();
    }

    public String getCerebrovascular() {
        return cerebrovascular;
    }

    public void setCerebrovascular(String cerebrovascular) {
        this.cerebrovascular = cerebrovascular == null ? null : cerebrovascular.trim();
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }
}