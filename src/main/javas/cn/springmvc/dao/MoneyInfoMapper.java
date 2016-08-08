package cn.springmvc.dao;

import cn.springmvc.model.MoneyInfo;

public interface MoneyInfoMapper {
    int deleteByPrimaryKey(Short mid);

    int insert(MoneyInfo record);

    int insertSelective(MoneyInfo record);

    MoneyInfo selectByPrimaryKey(Short mid);

    int updateByPrimaryKeySelective(MoneyInfo record);

    int updateByPrimaryKey(MoneyInfo record);
}