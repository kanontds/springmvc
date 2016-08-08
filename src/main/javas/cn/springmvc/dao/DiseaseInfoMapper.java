package cn.springmvc.dao;

import cn.springmvc.model.DiseaseInfo;

public interface DiseaseInfoMapper {
    int deleteByPrimaryKey(Short diseaseid);

    int insert(DiseaseInfo record);

    int insertSelective(DiseaseInfo record);

    DiseaseInfo selectByPrimaryKey(Short diseaseid);

    int updateByPrimaryKeySelective(DiseaseInfo record);

    int updateByPrimaryKey(DiseaseInfo record);
}