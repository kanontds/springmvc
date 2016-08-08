package cn.springmvc.model;

import java.util.Date;

public class HypertensionInfo {
    private Short hyid;

    private Date hytime;

    private String usemedicine;

    private String effect;

    private Double sbp;

    private Double dbp;

    private String hylevel;

    private String risklevel;

    private Short oldid;

    public Short getHyid() {
        return hyid;
    }

    public void setHyid(Short hyid) {
        this.hyid = hyid;
    }

    public Date getHytime() {
        return hytime;
    }

    public void setHytime(Date hytime) {
        this.hytime = hytime;
    }

    public String getUsemedicine() {
        return usemedicine;
    }

    public void setUsemedicine(String usemedicine) {
        this.usemedicine = usemedicine == null ? null : usemedicine.trim();
    }

    public String getEffect() {
        return effect;
    }

    public void setEffect(String effect) {
        this.effect = effect == null ? null : effect.trim();
    }

    public Double getSbp() {
        return sbp;
    }

    public void setSbp(Double sbp) {
        this.sbp = sbp;
    }

    public Double getDbp() {
        return dbp;
    }

    public void setDbp(Double dbp) {
        this.dbp = dbp;
    }

    public String getHylevel() {
        return hylevel;
    }

    public void setHylevel(String hylevel) {
        this.hylevel = hylevel == null ? null : hylevel.trim();
    }

    public String getRisklevel() {
        return risklevel;
    }

    public void setRisklevel(String risklevel) {
        this.risklevel = risklevel == null ? null : risklevel.trim();
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }
}