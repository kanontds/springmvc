package cn.springmvc.dao;

import cn.springmvc.model.Configure;

public interface ConfigureMapper {
    int deleteByPrimaryKey(Short cid);

    int insert(Configure record);

    int insertSelective(Configure record);

    Configure selectByPrimaryKey(Short cid);

    int updateByPrimaryKeySelective(Configure record);

    int updateByPrimaryKey(Configure record);
}