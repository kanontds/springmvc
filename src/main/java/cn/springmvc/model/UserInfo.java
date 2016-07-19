package cn.springmvc.model;

import java.util.Date;

public class UserInfo {
    private Short userid;

    private Short roleid;

    private String dvcode;

    private String username;

    private String pwd;

    private String usercardnum;

    private String usertelnum;

    private String useraddress;

    private Date usertime;

    private String useraccount;

    private String isdel;

    public Short getUserid() {
        return userid;
    }

    public void setUserid(Short userid) {
        this.userid = userid;
    }

    public Short getRoleid() {
        return roleid;
    }

    public void setRoleid(Short roleid) {
        this.roleid = roleid;
    }

    public String getDvcode() {
        return dvcode;
    }

    public void setDvcode(String dvcode) {
        this.dvcode = dvcode == null ? null : dvcode.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd == null ? null : pwd.trim();
    }

    public String getUsercardnum() {
        return usercardnum;
    }

    public void setUsercardnum(String usercardnum) {
        this.usercardnum = usercardnum == null ? null : usercardnum.trim();
    }

    public String getUsertelnum() {
        return usertelnum;
    }

    public void setUsertelnum(String usertelnum) {
        this.usertelnum = usertelnum == null ? null : usertelnum.trim();
    }

    public String getUseraddress() {
        return useraddress;
    }

    public void setUseraddress(String useraddress) {
        this.useraddress = useraddress == null ? null : useraddress.trim();
    }

    public Date getUsertime() {
        return usertime;
    }

    public void setUsertime(Date usertime) {
        this.usertime = usertime;
    }

    public String getUseraccount() {
        return useraccount;
    }

    public void setUseraccount(String useraccount) {
        this.useraccount = useraccount == null ? null : useraccount.trim();
    }

    public String getIsdel() {
        return isdel;
    }

    public void setIsdel(String isdel) {
        this.isdel = isdel == null ? null : isdel.trim();
    }
}