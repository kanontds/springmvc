package cn.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by wp on 16/7/12.
 */

@Controller
public class HomeController {
    @RequestMapping(value={"/demo"})
    public String index(){
        return "index";
    }

    @RequestMapping(value={"/"})
    public String sqwork(){
        return "sqwork";
    }
}
