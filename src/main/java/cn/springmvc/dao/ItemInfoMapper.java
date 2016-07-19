package cn.springmvc.dao;

import cn.springmvc.model.ItemInfo;

public interface ItemInfoMapper {
    int deleteByPrimaryKey(Short iid);

    int insert(ItemInfo record);

    int insertSelective(ItemInfo record);

    ItemInfo selectByPrimaryKey(Short iid);

    int updateByPrimaryKeySelective(ItemInfo record);

    int updateByPrimaryKey(ItemInfo record);
}