package cn.springmvc.dao;

import cn.springmvc.model.ContactsInfo;

public interface ContactsInfoMapper {
    int deleteByPrimaryKey(Short ciid);

    int insert(ContactsInfo record);

    int insertSelective(ContactsInfo record);

    ContactsInfo selectByPrimaryKey(Short ciid);

    int updateByPrimaryKeySelective(ContactsInfo record);

    int updateByPrimaryKey(ContactsInfo record);
}