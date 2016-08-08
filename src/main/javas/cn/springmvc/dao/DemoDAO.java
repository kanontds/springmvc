package cn.springmvc.dao;

import cn.springmvc.model.Demo;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wp on 16-6-30.
 */
public interface DemoDAO {
    /**
	 * 添加demo
	 * @param demo
	 * @return
	 */
	int insertDemo(Demo demo);
	HashMap selectDemo(int id);
	List selectDemos(int page, int size);
	void updateDemo(Demo demo);
	void deleteDemo(int id);
	Integer getDemoCount();
}
