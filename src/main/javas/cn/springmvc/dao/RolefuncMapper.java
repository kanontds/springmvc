package cn.springmvc.dao;

import cn.springmvc.model.RolefuncKey;

public interface RolefuncMapper {
    int deleteByPrimaryKey(RolefuncKey key);

    int insert(RolefuncKey record);

    int insertSelective(RolefuncKey record);
}