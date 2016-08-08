package cn.springmvc.dao;

import cn.springmvc.model.Xt_dept;

public interface Xt_deptMapper {
    int deleteByPrimaryKey(Short id);

    int insert(Xt_dept record);

    int insertSelective(Xt_dept record);

    Xt_dept selectByPrimaryKey(Short id);

    int updateByPrimaryKeySelective(Xt_dept record);

    int updateByPrimaryKey(Xt_dept record);
}