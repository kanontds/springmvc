package cn.springmvc.dao;

import cn.springmvc.model.OldInfo;

import java.util.List;

public interface OldInfoMapper {
    int deleteByPrimaryKey(Short oldid);

    int insert(OldInfo record);

    int insertSelective(OldInfo record);

    OldInfo selectByPrimaryKey(Short oldid);

    int updateByPrimaryKeySelective(OldInfo record);

    int updateByPrimaryKey(OldInfo record);

    List selectOldinfo(Integer page, Integer size);

    int getOldinfoCount();
}