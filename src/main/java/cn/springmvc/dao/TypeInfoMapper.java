package cn.springmvc.dao;

import cn.springmvc.model.TypeInfo;

public interface TypeInfoMapper {
    int deleteByPrimaryKey(String tid);

    int insert(TypeInfo record);

    int insertSelective(TypeInfo record);

    TypeInfo selectByPrimaryKey(String tid);

    int updateByPrimaryKeySelective(TypeInfo record);

    int updateByPrimaryKey(TypeInfo record);
}