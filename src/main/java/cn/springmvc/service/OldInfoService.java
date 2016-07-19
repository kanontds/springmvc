package cn.springmvc.service;

import cn.springmvc.model.Demo;
import cn.springmvc.model.OldInfo;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wp on 16-6-30.
 */
public interface OldInfoService {

//	int insertDemo(OldInfo demo);
//	HashMap selectDemo(int id);
//	List selectDemos(int page, int size);
//	void updateDemo(Demo demo);
//	void deleteDemo(int id);
//	Integer getDemoCount();

	void insertOldinfo(OldInfo oldInfo);
	void updateOldinfo(OldInfo oldInfo);
}
