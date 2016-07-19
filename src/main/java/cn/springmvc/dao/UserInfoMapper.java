package cn.springmvc.dao;

import cn.springmvc.model.UserInfo;

public interface UserInfoMapper {
    int deleteByPrimaryKey(Short userid);

    int insert(UserInfo record);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Short userid);

    int updateByPrimaryKeySelective(UserInfo record);

    int updateByPrimaryKey(UserInfo record);
}