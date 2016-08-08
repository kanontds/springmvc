package cn.springmvc.dao;

import cn.springmvc.model.FuncInfo;

public interface FuncInfoMapper {
    int deleteByPrimaryKey(Short funcid);

    int insert(FuncInfo record);

    int insertSelective(FuncInfo record);

    FuncInfo selectByPrimaryKey(Short funcid);

    int updateByPrimaryKeySelective(FuncInfo record);

    int updateByPrimaryKey(FuncInfo record);
}