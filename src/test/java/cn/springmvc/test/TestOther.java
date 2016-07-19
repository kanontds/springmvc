package cn.springmvc.test;

import org.junit.Test;

import java.io.File;
import java.util.Random;

/**
 * Created by wp on 16-6-30.
 */
public class TestOther {

    @Test
	public void addUser(){
        File currentDir=new File(".");
        System.out.println(currentDir.getAbsolutePath());
        for(File file:currentDir.listFiles()){
            System.out.println(file.getName());
        }

    }


    @Test
	public void addUser2(){
        Random ran = new Random();
        int delta = 0x9fa5 - 0x4e00 + 1;
         char han=(char)(0x4e00 + ran.nextInt(delta));
        System.out.println(han);
        System.out.println(100000%100);

    }
}
