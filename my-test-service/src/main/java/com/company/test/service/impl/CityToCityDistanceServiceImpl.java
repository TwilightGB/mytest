package com.company.test.service.impl;

import com.company.test.dto.CityToCityDistanceDto;
import com.company.test.manager.CityToCityDistanceManager;
import com.company.test.po.CityToCityDistance;
import com.company.test.service.CityToCityDistanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import mybatisUtil.page.Page;

import java.util.ArrayList;
import java.util.List;

public class CityToCityDistanceServiceImpl implements CityToCityDistanceService {

    private static final Logger logger = LoggerFactory.getLogger(CityToCityDistanceServiceImpl.class);

    private CityToCityDistanceManager cityToCityDistanceManager;

    @Override
    public Page<CityToCityDistance> selectPageByCondition(CityToCityDistanceDto param, Page<CityToCityDistance> page) throws Exception {
        logger.debug("selectPageByCondition...");
        if (param == null || page == null) {
            logger.warn("selectPageByCondition: parameter cannot be null!");
            return page;
        }
        page = cityToCityDistanceManager.selectPageByCondition(param,page);
        if (page == null || page.getResult() == null || page.getResult().size() < 1) {
            logger.warn("selectPageByCondition: Manager.selectPageByCondition result is empty!");
            return page;
        }
        return page;
    }

    @Override
    public CityToCityDistanceDto insertCityToCityDistance(CityToCityDistanceDto cityToCityDistanceDto) throws Exception{
        int num = cityToCityDistanceManager.insertCityToCityDistanceDto(cityToCityDistanceDto);
        return cityToCityDistanceDto;
    }

    @Override
    public int deleteCityToCityDistanceById(Long id) throws Exception {
        return cityToCityDistanceManager.deleteCityToCityDistanceById(id);
    }

    @Override
    public int deleteCityToCityDistanceAllData() throws Exception {
        return cityToCityDistanceManager.deleteCityToCityDistanceAllDataManger("");
    }

    @Override
    public CityToCityDistance selectCityToCityDistanceById(Long id) throws Exception {

        return cityToCityDistanceManager.selectCityToCityDistanceById(id);
    }

    @Override
    public CityToCityDistanceDto updateNewCityToCityDistance(CityToCityDistanceDto dto) throws Exception{

        int num = cityToCityDistanceManager.updateNewCityToCityDistanceManager(dto);
        return dto;
    }

    @Override
    public List<CityToCityDistanceDto> dealEexeclDataNew(List<CityToCityDistanceDto> cityToCityDistanceDtoList) {

        long start = System.currentTimeMillis();
        List<CityToCityDistanceDto> returnList = new ArrayList<CityToCityDistanceDto>();
        List<CityToCityDistanceDto> insertList = new ArrayList<CityToCityDistanceDto>();
        for (int i = 0; i < cityToCityDistanceDtoList.size() ; i++) {
            CityToCityDistanceDto cityToCityDistanceDto = cityToCityDistanceDtoList.get(i);
            try {
                if(cityToCityDistanceDto.getCheckState().intValue() == 0){
                    returnList.add(cityToCityDistanceDto);
                    continue;
                }
                cityToCityDistanceDto.setYn(1);
                //插入数据
                this.cityToCityDistanceManager.insertCityToCityDistanceDto(cityToCityDistanceDto);
                insertList.add(cityToCityDistanceDto);
            }catch (Exception e){
                cityToCityDistanceDto.setCheckState(0);
                cityToCityDistanceDto.setFailReason(e.getMessage());
                returnList.add(cityToCityDistanceDto);
            }
        }
        return returnList;
    }

    /**
     * @param failStr 失败str
     * @param lineNo  行号
     * @Description: 将错误原因加入行号
     * @Date: 14:10 2017/12/6
     */
    private String fillFailLineNo(String failStr, int lineNo) {
        if (!failStr.endsWith("、")) {
            failStr = failStr + "、";
        }
        return failStr;
    }

    public void setCityToCityDistanceManager(CityToCityDistanceManager cityToCityDistanceManager) {
        this.cityToCityDistanceManager = cityToCityDistanceManager;
    }
}
