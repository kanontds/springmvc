package cn.springmvc.model;

public class HabitInfo {
    private Short habitid;

    private String blood;

    private String smokeyears;

    private String smokefrequency;

    private String drinkfrequency;

    private String drinktype;

    private String sportsfrequency;

    private String sportsduration;

    private String sleepduration;

    private Short oldid;

    public Short getHabitid() {
        return habitid;
    }

    public void setHabitid(Short habitid) {
        this.habitid = habitid;
    }

    public String getBlood() {
        return blood;
    }

    public void setBlood(String blood) {
        this.blood = blood == null ? null : blood.trim();
    }

    public String getSmokeyears() {
        return smokeyears;
    }

    public void setSmokeyears(String smokeyears) {
        this.smokeyears = smokeyears == null ? null : smokeyears.trim();
    }

    public String getSmokefrequency() {
        return smokefrequency;
    }

    public void setSmokefrequency(String smokefrequency) {
        this.smokefrequency = smokefrequency == null ? null : smokefrequency.trim();
    }

    public String getDrinkfrequency() {
        return drinkfrequency;
    }

    public void setDrinkfrequency(String drinkfrequency) {
        this.drinkfrequency = drinkfrequency == null ? null : drinkfrequency.trim();
    }

    public String getDrinktype() {
        return drinktype;
    }

    public void setDrinktype(String drinktype) {
        this.drinktype = drinktype == null ? null : drinktype.trim();
    }

    public String getSportsfrequency() {
        return sportsfrequency;
    }

    public void setSportsfrequency(String sportsfrequency) {
        this.sportsfrequency = sportsfrequency == null ? null : sportsfrequency.trim();
    }

    public String getSportsduration() {
        return sportsduration;
    }

    public void setSportsduration(String sportsduration) {
        this.sportsduration = sportsduration == null ? null : sportsduration.trim();
    }

    public String getSleepduration() {
        return sleepduration;
    }

    public void setSleepduration(String sleepduration) {
        this.sleepduration = sleepduration == null ? null : sleepduration.trim();
    }

    public Short getOldid() {
        return oldid;
    }

    public void setOldid(Short oldid) {
        this.oldid = oldid;
    }
}