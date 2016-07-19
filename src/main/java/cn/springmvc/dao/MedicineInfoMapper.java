package cn.springmvc.dao;

import cn.springmvc.model.MedicineInfo;

public interface MedicineInfoMapper {
    int deleteByPrimaryKey(Short medid);

    int insert(MedicineInfo record);

    int insertSelective(MedicineInfo record);

    MedicineInfo selectByPrimaryKey(Short medid);

    int updateByPrimaryKeySelective(MedicineInfo record);

    int updateByPrimaryKey(MedicineInfo record);
}