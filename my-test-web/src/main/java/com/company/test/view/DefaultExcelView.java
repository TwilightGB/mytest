package com.company.test.view;

import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

public class DefaultExcelView extends AbstractExcelView {

    private static final Logger logger = Logger.getLogger(DefaultExcelView.class);

    @Override
    protected void buildExcelDocument(Map<String, Object> map, HSSFWorkbook workbook, HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        try {
            String filename = (String) map.get("filename");
            if (filename == null || filename.trim().length() == 0) {
                filename = System.currentTimeMillis() + ".xls";
            }
            String agent = request.getHeader("USER-AGENT").toLowerCase();

            //添加块-根据浏览器类型处理文件名称
            if(agent.indexOf("msie")>-1){
                response.setHeader("Content-disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));// 设定输出文件头
            }
            else{  //firefox/safari不转码
                response.setHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes("GB2312"), "ISO-8859-1"));
            }
            //添加块

//			response.setHeader("Content-disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));// 设定输出文件头
            this.buildExcelDocument(map, workbook);
        } catch (Exception e) {
            logger.error("buildExcelDocument-error:", e);
            throw e;
        }
    }

    /**
     * 构建Excel文本
     * @param map
     * @param workbook
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    protected void buildExcelDocument(Map<String, Object> map, HSSFWorkbook workbook) throws Exception {
        String sheetname = (String) map.get("sheetname");

        if (sheetname == null || sheetname.trim().length() == 0) {
            sheetname = "Sheet1";
        }

        List<List<Object>> contents = (List<List<Object>>) map.get("contents");
        if (contents == null) {
            throw new RuntimeException("DefaultExcelView Attribute[contents] in Model can't be null! ");
        }
    }
}
