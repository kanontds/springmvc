package cn.springmvc.dao;

import cn.springmvc.model.Xt_role;

public interface Xt_roleMapper {
    int deleteByPrimaryKey(Short roleid);

    int insert(Xt_role record);

    int insertSelective(Xt_role record);

    Xt_role selectByPrimaryKey(Short roleid);

    int updateByPrimaryKeySelective(Xt_role record);

    int updateByPrimaryKey(Xt_role record);
}