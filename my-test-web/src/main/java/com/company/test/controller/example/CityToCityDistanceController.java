package com.company.test.controller.example;

import com.company.test.dto.CityToCityDistanceDto;
import com.company.test.dto.CommonDto;
import com.company.test.po.CityToCityDistance;
import com.company.test.service.CityToCityDistanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import mybatisUtil.page.Page;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
/**
 * 城市间距离
 */
@Controller
@RequestMapping("/example/city-to-city")
public class CityToCityDistanceController {

    private static final Logger logger = LoggerFactory.getLogger(CityToCityDistanceController.class);

    private CityToCityDistanceService cityToCityDistanceService;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));
    }

    /**
     * 中转主页
     *
     * @return String
     */
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String inIndex(Model model) {
        return "example/city-to-city/index";
    }

    /**
     * 查询操作
     *
     * @return CommonDto
     */
    @ResponseBody
    @RequestMapping(value = "/doQuery", method = RequestMethod.POST)
    public CommonDto<Page<CityToCityDistance>> doQuery(
            Page<CityToCityDistance> page, CityToCityDistanceDto dto) {

        CommonDto<Page<CityToCityDistance>> cdto = new CommonDto<Page<CityToCityDistance>>();
        try {
            logger.debug("doQuery begin...");
            page = cityToCityDistanceService.selectPageByCondition(dto, page);
            cdto.setCode(CommonDto.CODE_NORMAL);
            cdto.setData(page);
        } catch (Exception e) {
            logger.error("doQuery-error:", e);
            cdto.setCode(CommonDto.CODE_EXCEPTION);
            cdto.setData(null);
            cdto.setMessage("运行异常：" + e.getMessage());
        }
        return cdto;
    }
    /**
     * 导入模板下载
     */
    @RequestMapping(value = "/downloadTemplate", method = RequestMethod.GET)
    public void downloadTemplate(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String basePath = request.getSession().getServletContext().getRealPath("/");
        File file = new File(basePath + "static/files/city-to-city-distance.xlsx".replace("/", File.separator));
        if (!file.canRead()) {
            response.sendError(404);
            return;
        }
        String fileName = "城市间距离配置模板.xlsx";
        response.setHeader("Content-Disposition", "attachment; filename=" + new String(fileName.getBytes("GB2312"), "ISO-8859-1"));
        response.setContentType("application/octet-stream;charset=UTF-8");
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
        int count = -1;
        byte[] buffer = new byte[10240];
        while ((count = bis.read(buffer)) > -1) {
            response.getOutputStream().write(buffer, 0, count);
        }
    }

    public void setCityToCityDistanceService(CityToCityDistanceService cityToCityDistanceService) {
        this.cityToCityDistanceService = cityToCityDistanceService;
    }
}
