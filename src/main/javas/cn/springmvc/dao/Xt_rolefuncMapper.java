package cn.springmvc.dao;

import cn.springmvc.model.Xt_rolefunc;

public interface Xt_rolefuncMapper {
    int deleteByPrimaryKey(Short rolefuncid);

    int insert(Xt_rolefunc record);

    int insertSelective(Xt_rolefunc record);

    Xt_rolefunc selectByPrimaryKey(Short rolefuncid);

    int updateByPrimaryKeySelective(Xt_rolefunc record);

    int updateByPrimaryKey(Xt_rolefunc record);
}