package com.company.test.service;


import com.company.test.dto.CityToCityDistanceDto;
import com.company.test.po.CityToCityDistance;
import mybatisUtil.page.Page;

import java.util.List;

public interface CityToCityDistanceService {

    Page<CityToCityDistance> selectPageByCondition(CityToCityDistanceDto param, Page<CityToCityDistance> page) throws Exception;

    CityToCityDistanceDto insertCityToCityDistance(CityToCityDistanceDto cityToCityDistanceDto) throws Exception;

    int deleteCityToCityDistanceById(Long id)throws Exception;

    int deleteCityToCityDistanceAllData()throws Exception;

    CityToCityDistance selectCityToCityDistanceById(Long id)throws Exception;

    CityToCityDistanceDto updateNewCityToCityDistance(CityToCityDistanceDto dto) throws Exception;

    List<CityToCityDistanceDto> dealEexeclDataNew(List<CityToCityDistanceDto> cityToCityDistanceDtoL);
}
