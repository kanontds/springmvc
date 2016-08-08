package cn.springmvc.controller;

import cn.springmvc.model.Demo;
import cn.springmvc.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @Autowired
    DemoService demoService;


    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Map<String, Object> insertData(Demo demo, HttpServletRequest request, HttpServletResponse response) throws Exception {
        //request.setAttribute("name", demo.getId() + "___" + demo.getContent());
        Map<String, Object> modelMap=new HashMap<String, Object>();
        demoService.insertDemo(demo);
        modelMap.put("success",true);
        return modelMap;
    }

    private Map<String, Object> myUpdateDate(int id,Demo demo, HttpServletRequest request, HttpServletResponse response) throws Exception{
        Map<String, Object> modelMap=new HashMap<String, Object>();
        demo.setId(id);
        System.out.println("my demo my demo my demo my demo my demo my demo my demo my demo ");
        System.out.println(demo);
        demoService.updateDemo(demo);
        modelMap.put("success",true);
        modelMap.put("testmyid",id);
        return modelMap;
    }
    @ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public Map<String, Object> updateData(@PathVariable int id,Demo demo, HttpServletRequest request, HttpServletResponse response) throws Exception {
       return myUpdateDate(id, demo, request, response);
    }

    @ResponseBody
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Map<String, Object> updateDataPut(@PathVariable int id,Demo demo, HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("use put");
        System.out.println(demo);
        return myUpdateDate(id, demo, request, response);
    }

    @ResponseBody
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public Map<String, Object> deleteData(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) throws Exception {
        Map<String, Object> modelMap=new HashMap<String, Object>();
        demoService.deleteDemo(id);
        modelMap.put("success",true);
        return modelMap;
    }


    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.GET)
    public Map<String, Object> getList(HttpServletRequest request, HttpServletResponse response) {
        List<HashMap> list = new ArrayList<HashMap>();
        int page=Integer.parseInt(request.getParameter("page"));
        int rows=Integer.parseInt(request.getParameter("rows"));
        list=demoService.selectDemos((page-1)*rows,rows);
        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("total", demoService.getDemoCount());
        modelMap.put("rows", list);
        modelMap.put("success", "true");
        return modelMap;
    }





}