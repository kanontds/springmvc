package cn.springmvc.dao;

import cn.springmvc.model.FuncInfo1;

public interface FuncInfo1Mapper {
    int insert(FuncInfo1 record);

    int insertSelective(FuncInfo1 record);
}