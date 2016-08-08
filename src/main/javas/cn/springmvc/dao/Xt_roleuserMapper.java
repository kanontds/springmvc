package cn.springmvc.dao;

import cn.springmvc.model.Xt_roleuser;

public interface Xt_roleuserMapper {
    int insert(Xt_roleuser record);

    int insertSelective(Xt_roleuser record);
}