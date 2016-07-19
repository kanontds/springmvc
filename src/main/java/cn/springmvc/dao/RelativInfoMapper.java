package cn.springmvc.dao;

import cn.springmvc.model.RelativInfo;

public interface RelativInfoMapper {
    int deleteByPrimaryKey(Short rid);

    int insert(RelativInfo record);

    int insertSelective(RelativInfo record);

    RelativInfo selectByPrimaryKey(Short rid);

    int updateByPrimaryKeySelective(RelativInfo record);

    int updateByPrimaryKey(RelativInfo record);
}