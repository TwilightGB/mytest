package com.company.test.dao;

import mybatisUtil.annotation.ProxyMethod;
import mybatisUtil.annotation.Statement;
import com.company.test.dto.CityToCityDistanceDto;
import com.company.test.po.CityToCityDistance;
import mybatisUtil.page.Page;

import java.util.Map;

public interface CityToCityDistanceDao {

    String NAMESPACE = "com.company.test.dao.impl.CityToCityDistanceDaoImpl";
    /**
     * 分页查询
     *
     * @param parameter 条件
     * @param page 分页
     * @return Page
     * @throws Exception 抛出异常
     */
    @Statement(namespace = NAMESPACE, sqlId = "selectPageByCondition")
    @ProxyMethod(name = "selectList", parameterTypes = {String.class, Object.class, Page.class})
    Page<CityToCityDistance> selectPageByCondition(CityToCityDistanceDto parameter, Page<CityToCityDistance> page) throws Exception;

    /**
     * 根据条件查询城市间距离
     */
    CityToCityDistance selectCityToCityDistanceByMap(Map<String, Integer> param) throws Exception;

    /**
     * 单条数据插入
     *
     * @param parameter 条件
     * @return int
     * @throws Exception 抛出异常
     */
    int insert(CityToCityDistanceDto parameter) throws Exception;

    /**
     *删除
     * @param id 条件
     * @return int
     * @throws Exception 抛出异常
     */
    int delete(Long id) throws Exception;

    /**
     *删除所有数据
     * @return int
     * @throws Exception 抛出异常
     */
    int deleteAllData(String id) throws Exception;

    /**
     *根据id获取城市间距离 配置
     * @param id 条件
     * @return int
     * @throws Exception 抛出异常
     */
    CityToCityDistance selectCityToCityDistanceById(Long id) throws Exception;

    /**
     *更新指定数据
     * @param dto 条件
     * @return int
     * @throws Exception 抛出异常
     */
    int updateNewCityToCityDistanceDao(CityToCityDistanceDto dto) throws Exception;
}
