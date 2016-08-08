package cn.springmvc.dao;

import cn.springmvc.model.Division;

public interface DivisionMapper {
    int deleteByPrimaryKey(String dvcode);

    int insert(Division record);

    int insertSelective(Division record);

    Division selectByPrimaryKey(String dvcode);

    int updateByPrimaryKeySelective(Division record);

    int updateByPrimaryKey(Division record);
}