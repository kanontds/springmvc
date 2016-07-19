package cn.springmvc.model;

import java.util.Date;

/**
 * Created by wp on 16-6-30.
 */
public class Demo {
    private int id;
    private String dtime;
    private String place;
    private String content;

    private String mytext1;
    private String mytext2;
    private String mytext3;
    private String mytext4;
    private String mytext5;
    private String mytext6;
private String mytext7;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDtime() {
        return dtime;
    }

    public void setDtime(String dtime) {
        this.dtime = dtime;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMytext1() {
        return mytext1;
    }

    public void setMytext1(String mytext1) {
        this.mytext1 = mytext1;
    }

    public String getMytext2() {
        return mytext2;
    }

    public void setMytext2(String mytext2) {
        this.mytext2 = mytext2;
    }

    public String getMytext3() {
        return mytext3;
    }

    public void setMytext3(String mytext3) {
        this.mytext3 = mytext3;
    }

    public String getMytext4() {
        return mytext4;
    }

    public void setMytext4(String mytext4) {
        this.mytext4 = mytext4;
    }

    public String getMytext5() {
        return mytext5;
    }

    public void setMytext5(String mytext5) {
        this.mytext5 = mytext5;
    }

    public String getMytext6() {
        return mytext6;
    }

    public void setMytext6(String mytext6) {
        this.mytext6 = mytext6;
    }

    public String getMytext7() {
        return mytext7;
    }

    public void setMytext7(String mytext7) {
        this.mytext7 = mytext7;
    }

    @Override
    public String toString() {
        return "Demo{" +
                "id=" + id +
                ", dtime='" + dtime + '\'' +
                ", place='" + place + '\'' +
                ", content='" + content + '\'' +
                ", mytext1='" + mytext1 + '\'' +
                ", mytext2='" + mytext2 + '\'' +
                ", mytext3='" + mytext3 + '\'' +
                ", mytext4='" + mytext4 + '\'' +
                ", mytext5='" + mytext5 + '\'' +
                ", mytext6='" + mytext6 + '\'' +
                ", mytext7='" + mytext7 + '\'' +
                '}';
    }
}
