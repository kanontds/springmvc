package cn.springmvc.dao;

import cn.springmvc.model.HeredityInfo;

public interface HeredityInfoMapper {
    int deleteByPrimaryKey(Short heredityid);

    int insert(HeredityInfo record);

    int insertSelective(HeredityInfo record);

    HeredityInfo selectByPrimaryKey(Short heredityid);

    int updateByPrimaryKeySelective(HeredityInfo record);

    int updateByPrimaryKey(HeredityInfo record);
}