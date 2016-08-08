package cn.springmvc.dao;

import cn.springmvc.model.MsgInfo;

public interface MsgInfoMapper {
    int deleteByPrimaryKey(Short msgid);

    int insert(MsgInfo record);

    int insertSelective(MsgInfo record);

    MsgInfo selectByPrimaryKey(Short msgid);

    int updateByPrimaryKeySelective(MsgInfo record);

    int updateByPrimaryKey(MsgInfo record);
}