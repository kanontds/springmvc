package cn.springmvc.service;

import cn.springmvc.model.Demo;
import cn.springmvc.unit.PageHelper;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wp on 16-6-30.
 */
public interface DemoService {

	int insertDemo(Demo demo);
	HashMap selectDemo(int id);
	List selectDemos(int page, int size);
	void updateDemo(Demo demo);
	void deleteDemo(int id);
	Integer getDemoCount();
	PageHelper.Page<Demo> demoSelectPage(int pageNumber,int pageSize);
}
