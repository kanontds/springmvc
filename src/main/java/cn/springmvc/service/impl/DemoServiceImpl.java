package cn.springmvc.service.impl;

import cn.springmvc.dao.DemoDAO;
import cn.springmvc.model.Demo;
import cn.springmvc.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wp on 16-6-30.
 */

@Service
public class DemoServiceImpl implements DemoService {

	@Autowired
	private DemoDAO demoDAO;

	@Override
	public int insertDemo(Demo demo) {
		return demoDAO.insertDemo(demo);
	}

	@Override
	public HashMap selectDemo(int id) {
		return demoDAO.selectDemo(id);
	}

	@Override
	public List selectDemos(int page, int size) {
		return demoDAO.selectDemos(page, size);
	}

	@Override
	public void updateDemo(Demo demo) {
		demoDAO.updateDemo(demo);
	}

	@Override
	public void deleteDemo(int id) {
		demoDAO.deleteDemo(id);
	}

	@Override
	public Integer getDemoCount() {
		return demoDAO.getDemoCount();
	}
}