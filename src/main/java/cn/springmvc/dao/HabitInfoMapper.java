package cn.springmvc.dao;

import cn.springmvc.model.HabitInfo;

public interface HabitInfoMapper {
    int deleteByPrimaryKey(Short habitid);

    int insert(HabitInfo record);

    int insertSelective(HabitInfo record);

    HabitInfo selectByPrimaryKey(Short habitid);

    int updateByPrimaryKeySelective(HabitInfo record);

    int updateByPrimaryKey(HabitInfo record);
}