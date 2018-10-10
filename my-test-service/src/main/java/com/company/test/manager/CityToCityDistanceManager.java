package com.company.test.manager;


import com.company.test.dao.CityToCityDistanceDao;
import com.company.test.dto.CityToCityDistanceDto;
import com.company.test.po.CityToCityDistance;
import mybatisUtil.page.Page;

import java.util.HashMap;
import java.util.Map;

public class CityToCityDistanceManager {

    private CityToCityDistanceDao cityToCityDistanceDao;

    public void setCityToCityDistanceDao(CityToCityDistanceDao cityToCityDistanceDao) {
        this.cityToCityDistanceDao = cityToCityDistanceDao;
    }

    /**
     * 分页查询
     *
     * @param parameter 条件
     * @param page      分页
     * @return Page
     * @throws Exception 抛出异常
     */
    public Page<CityToCityDistance> selectPageByCondition(CityToCityDistanceDto parameter, Page<CityToCityDistance> page) throws Exception {
        return cityToCityDistanceDao.selectPageByCondition(parameter, page);
    }

    /**
     * 根据条件查询 城市间距离配置
     */
    public CityToCityDistance selectCityToCityDistanceByContion(Integer startProvId, Integer startCityId, Integer endProvId, Integer endCityId) throws Exception {
        Map<String,Integer> paramMap =  new HashMap<>();
        paramMap.put("startProvId",startProvId);
        paramMap.put("startCityId",startCityId);
        paramMap.put("endProvId",endProvId);
        paramMap.put("endCityId",endCityId);
        return cityToCityDistanceDao.selectCityToCityDistanceByMap(paramMap);
    }

    /**
     * 插入
     *
     * @param cityToCityDistanceDto 城市间距离配置
     * @return int
     * @throws Exception 抛出异常
     */
    public int insertCityToCityDistanceDto(CityToCityDistanceDto cityToCityDistanceDto) throws Exception {
        return cityToCityDistanceDao.insert(cityToCityDistanceDto);
    }

    /**
     * 删除
     *
     * @param id 城市间距离配置
     * @return int
     * @throws Exception 抛出异常
     */
    public int deleteCityToCityDistanceById(Long id) throws Exception {
        return cityToCityDistanceDao.delete(id);
    }

    /**
     * 一键清除所有数据
     *
     * @return int
     * @throws Exception 抛出异常
     */
    public int deleteCityToCityDistanceAllDataManger(String id) throws Exception {
        return cityToCityDistanceDao.deleteAllData(id);
    }

    /**
     * 更新指定数据
     *
     * @param dto 城市间距离配置
     * @return int
     * @throws Exception 抛出异常
     */
    public int updateNewCityToCityDistanceManager(CityToCityDistanceDto dto) throws Exception {
        return cityToCityDistanceDao.updateNewCityToCityDistanceDao(dto);
    }

    public CityToCityDistance selectCityToCityDistanceById(Long id) throws Exception{
        return cityToCityDistanceDao.selectCityToCityDistanceById(id);

    }
}
