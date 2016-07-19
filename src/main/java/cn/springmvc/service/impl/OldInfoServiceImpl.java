package cn.springmvc.service.impl;

import cn.springmvc.dao.DemoDAO;
import cn.springmvc.dao.OldInfoMapper;
import cn.springmvc.model.Demo;
import cn.springmvc.model.OldInfo;
import cn.springmvc.service.DemoService;
import cn.springmvc.service.OldInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Created by wp on 16-6-30.
 */

@Service
public class OldInfoServiceImpl implements OldInfoService {

	@Autowired
	private OldInfoMapper oldInfoMapper;

	@Override
	public void insertOldinfo(OldInfo oldInfo) {
	   	oldInfoMapper.insert(oldInfo);
	}

	@Override
	public void updateOldinfo(OldInfo oldInfo) {
		oldInfoMapper.updateByPrimaryKey(oldInfo);
	}

//	@Override
//	public int insertDemo(OldInfo demo) {
//		return demoDAO.insert(demo);
//	}
//
//	@Override
//	public HashMap selectDemo(int id) {
//		return null;
//	}
//
//
//
//	@Override
//	public void updateDemo(Demo demo) {
//		//demoDAO.updateDemo(demo);
//	}
//
//	@Override
//	public void deleteDemo(int id) {
//		//demoDAO.deleteDemo(id);
//	}
//
//	@Override
//	public Integer getDemoCount() {
//		return demoDAO.getOldinfoCount();
//	}
//
//	@Override
//	public List selectDemos(int page, int size) {
//		return demoDAO.selectOldinfo(page,size);
//	}
}