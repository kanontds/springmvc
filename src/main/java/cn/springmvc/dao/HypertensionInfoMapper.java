package cn.springmvc.dao;

import cn.springmvc.model.HypertensionInfo;

public interface HypertensionInfoMapper {
    int deleteByPrimaryKey(Short hyid);

    int insert(HypertensionInfo record);

    int insertSelective(HypertensionInfo record);

    HypertensionInfo selectByPrimaryKey(Short hyid);

    int updateByPrimaryKeySelective(HypertensionInfo record);

    int updateByPrimaryKey(HypertensionInfo record);
}