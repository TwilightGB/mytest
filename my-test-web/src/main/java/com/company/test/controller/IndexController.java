package com.company.test.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.LocaleResolver;

@Controller
@RequestMapping("/")
public class IndexController {
	
	private static final Logger logger = Logger.getLogger(IndexController.class);
	
    @Autowired
    private LocaleResolver localeResolver;
    

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        try {

            model.addAttribute("erpUser", "");
        } catch (Exception e) {
            logger.error("index error!", e);
        }
        return "index";
    }

    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public String welcome(Model model) {
        return "welcome";
    }

    @RequestMapping(value = "/error/{name}", method = RequestMethod.GET)
    public String error(Model model, @PathVariable("name") String name) {
        logger.info("request url: error/"+ name);
        return "error/"+ name;
    }

    @RequestMapping(value = "/demo/{name}", method = RequestMethod.GET)
    public String demo(Model model, @PathVariable("name") String name) {
        logger.info("request url:demo/"+ name);
        try {
            model.addAttribute("erpUser", "");
        } catch (Exception e) {
            logger.error("demo-error:", e);
        }
        return "demo/"+ name;
    }
    
    //------------- getter and setter --------------//
    public LocaleResolver getLocaleResolver() {
		return localeResolver;
	}

	public void setLocaleResolver(LocaleResolver localeResolver) {
		this.localeResolver = localeResolver;
	}
	
}
