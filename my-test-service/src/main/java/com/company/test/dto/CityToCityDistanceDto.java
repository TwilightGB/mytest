package com.company.test.dto;

import java.io.Serializable;

public class CityToCityDistanceDto implements Serializable {

    private static final long serialVersionUID = 1L;
    //  主键id
    private Integer id;
    //  始发省份ID
    private Integer startProvId;
    //  始发省份名称
    private String startProvName;
    //  始发城市ID
    private Integer startCityId;
    //  始发城市名称
    private String startCityName;

    //  目的省份ID
    private Integer endProvId;
    //  目的省份名称
    private String endProvName;
    // 目的城市ID
    private Integer endCityId;
    //  目的城市名称
    private String endCityName;

    //  线路编码
    private String lineName;
    //  里程数
    private String lineDistance;

    //操作人ID
    private Integer operatorId;
    //操作人账号
    private String  operatorCode;
    //操作人名称
    private String  operatorName;
    //行号
    private Integer lineNo;
    //失败原因
    private String failReason;
    //失败编码
    private Integer checkState;

    //  有效标识
    private Integer yn;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getStartProvId() {
        return startProvId;
    }

    public void setStartProvId(Integer startProvId) {
        this.startProvId = startProvId;
    }

    public String getStartProvName() {
        return startProvName;
    }

    public void setStartProvName(String startProvName) {
        this.startProvName = startProvName;
    }

    public Integer getStartCityId() {
        return startCityId;
    }

    public void setStartCityId(Integer startCityId) {
        this.startCityId = startCityId;
    }

    public String getStartCityName() {
        return startCityName;
    }

    public void setStartCityName(String startCityName) {
        this.startCityName = startCityName;
    }

    public Integer getEndProvId() {
        return endProvId;
    }

    public void setEndProvId(Integer endProvId) {
        this.endProvId = endProvId;
    }

    public String getEndProvName() {
        return endProvName;
    }

    public void setEndProvName(String endProvName) {
        this.endProvName = endProvName;
    }

    public Integer getEndCityId() {
        return endCityId;
    }

    public void setEndCityId(Integer endCityId) {
        this.endCityId = endCityId;
    }

    public String getEndCityName() {
        return endCityName;
    }

    public void setEndCityName(String endCityName) {
        this.endCityName = endCityName;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getLineDistance() {
        return lineDistance;
    }

    public void setLineDistance(String lineDistance) {
        this.lineDistance = lineDistance;
    }

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    public String getOperatorCode() {
        return operatorCode;
    }

    public void setOperatorCode(String operatorCode) {
        this.operatorCode = operatorCode;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public Integer getLineNo() {
        return lineNo;
    }

    public void setLineNo(Integer lineNo) {
        this.lineNo = lineNo;
    }

    public String getFailReason() {
        return failReason;
    }

    public void setFailReason(String failReason) {
        this.failReason = failReason;
    }

    public Integer getCheckState() {
        return checkState;
    }

    public void setCheckState(Integer checkState) {
        this.checkState = checkState;
    }

    public Integer getYn() {
        return yn;
    }

    public void setYn(Integer yn) {
        this.yn = yn;
    }
}
