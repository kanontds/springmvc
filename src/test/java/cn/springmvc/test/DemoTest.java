package cn.springmvc.test;

import cn.springmvc.model.Demo;
import cn.springmvc.service.DemoService;
import cn.springmvc.service.OldInfoService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

/**
 * Created by wp on 16-6-30.
 */
public class DemoTest {

private DemoService demoService;
	private OldInfoService oldInfoService;

	private Random ran = new Random();
	private int delta = 0x5fa5 - 0x4e00 + 1;
	private char getHan(){
         char han=(char)(0x4e00 + ran.nextInt(delta));
		return han;
	}
	private String getHans(int len){
		String result="";
		for(int i=0;i<len;i++){
			result+=(char)(0x4e00 + ran.nextInt(delta));
		}
		return result;
	}
	@Before
	public void before(){
		@SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:conf/spring.xml"
				,"classpath:conf/spring-mybatis.xml");
		demoService = (DemoService) context.getBean("demoServiceImpl");
		oldInfoService = (OldInfoService) context.getBean("oldInfoServiceImpl");

	}

	@Test
	public void addUser(){
		Demo demo = new Demo();
		demo.setContent("hello");
		demo.setPlace("北国"+getHan());
		System.out.println(demoService.insertDemo(demo));
	}

	@Test
	public void selectOldinfoPage(){

		System.out.println("test1111+" + oldInfoService.findSysLoginLog(2,1).getPageSize());
	}

	@Test
	public void demoSelectPage(){
		System.out.println("demopagesize:" + demoService.demoSelectPage(1,5).toString());


	}

	@Test
	public void getDemo(){
		Demo demo = new Demo();
		System.out.println(demoService.selectDemo(1));
	}

	@Test
	public void getDemos(){
		Demo demo = new Demo();
		System.out.println(demoService.selectDemos(4,10));
	}

	@Test
	public void getDemoCount(){
		System.out.println(demoService.getDemoCount());
	}

	@Test
	public void addUsers(){

		SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm");
		System.out.println(format.format(new Date()));
		for(int i=0;i<100000;i++){
			Demo demo = new Demo();
			demo.setDtime(format.format(new Date()));
		demo.setContent(getHans(i%100+1));
		demo.setPlace(getHans(i%100+1));
			demo.setMytext1(UUID.randomUUID().toString());

			demo.setMytext2(UUID.randomUUID().toString());
			demo.setMytext3(UUID.randomUUID().toString());
			demo.setMytext4(UUID.randomUUID().toString());
			demo.setMytext5(UUID.randomUUID().toString());
			demo.setMytext6(UUID.randomUUID().toString());
			demo.setMytext7(UUID.randomUUID().toString());
		System.out.println(demoService.insertDemo(demo));
		}
	}

	@Test
	public  void test4j(){
		System.out.println("shiwu");
	}
}