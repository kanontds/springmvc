package cn.springmvc.dao;

import cn.springmvc.model.LogInfo;

public interface LogInfoMapper {
    int deleteByPrimaryKey(Short logid);

    int insert(LogInfo record);

    int insertSelective(LogInfo record);

    LogInfo selectByPrimaryKey(Short logid);

    int updateByPrimaryKeySelective(LogInfo record);

    int updateByPrimaryKey(LogInfo record);
}