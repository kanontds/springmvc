package cn.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2016/7/13.
 */
@Controller
@RequestMapping("/tds")
public class TdsController {

    @RequestMapping("/index")
    public String index(){
        return "tdsindex";
    }
}
