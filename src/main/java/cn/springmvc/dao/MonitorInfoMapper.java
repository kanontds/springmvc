package cn.springmvc.dao;

import cn.springmvc.model.MonitorInfo;

public interface MonitorInfoMapper {
    int deleteByPrimaryKey(Short mid);

    int insert(MonitorInfo record);

    int insertSelective(MonitorInfo record);

    MonitorInfo selectByPrimaryKey(Short mid);

    int updateByPrimaryKeySelective(MonitorInfo record);

    int updateByPrimaryKey(MonitorInfo record);
}