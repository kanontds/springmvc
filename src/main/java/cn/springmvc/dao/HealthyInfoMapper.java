package cn.springmvc.dao;

import cn.springmvc.model.HealthyInfo;

public interface HealthyInfoMapper {
    int deleteByPrimaryKey(Short hid);

    int insert(HealthyInfo record);

    int insertSelective(HealthyInfo record);

    HealthyInfo selectByPrimaryKey(Short hid);

    int updateByPrimaryKeySelective(HealthyInfo record);

    int updateByPrimaryKey(HealthyInfo record);
}