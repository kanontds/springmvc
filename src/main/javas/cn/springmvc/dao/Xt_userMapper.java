package cn.springmvc.dao;

import cn.springmvc.model.Xt_user;

public interface Xt_userMapper {
    int deleteByPrimaryKey(String userid);

    int insert(Xt_user record);

    int insertSelective(Xt_user record);

    Xt_user selectByPrimaryKey(String userid);

    int updateByPrimaryKeySelective(Xt_user record);

    int updateByPrimaryKey(Xt_user record);
}