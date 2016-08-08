package cn.springmvc.dao;

import cn.springmvc.model.Fileinfo;

public interface FileinfoMapper {
    int deleteByPrimaryKey(Short fileid);

    int insert(Fileinfo record);

    int insertSelective(Fileinfo record);

    Fileinfo selectByPrimaryKey(Short fileid);

    int updateByPrimaryKeySelective(Fileinfo record);

    int updateByPrimaryKey(Fileinfo record);
}