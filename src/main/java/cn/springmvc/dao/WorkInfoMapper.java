package cn.springmvc.dao;

import cn.springmvc.model.WorkInfo;

public interface WorkInfoMapper {
    int deleteByPrimaryKey(String wid);

    int insert(WorkInfo record);

    int insertSelective(WorkInfo record);

    WorkInfo selectByPrimaryKey(String wid);

    int updateByPrimaryKeySelective(WorkInfo record);

    int updateByPrimaryKey(WorkInfo record);
}