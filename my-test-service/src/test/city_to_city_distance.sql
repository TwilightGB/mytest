/*
Navicat MySQL Data Transfer

Source Server         : mytest
Source Server Version : 50641
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50641
File Encoding         : 65001

Date: 2018-10-10 20:09:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `city_to_city_distance`
-- ----------------------------
DROP TABLE IF EXISTS `city_to_city_distance`;
CREATE TABLE `city_to_city_distance` (
  `id` bigint(29) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `start_prov_id` int(11) DEFAULT NULL COMMENT '始发省id',
  `start_prov_name` varchar(64) DEFAULT NULL COMMENT '始发省名称',
  `start_city_id` int(11) DEFAULT NULL COMMENT '始发城市id',
  `start_city_name` varchar(64) DEFAULT NULL COMMENT '始发城市名称',
  `end_prov_id` int(11) DEFAULT NULL COMMENT '目的省id',
  `end_prov_name` varchar(64) DEFAULT NULL COMMENT '目的省份名称',
  `end_city_id` int(11) DEFAULT NULL COMMENT '目的城市id',
  `end_city_name` varchar(64) DEFAULT NULL COMMENT '目的城市名称',
  `line_name` varchar(255) DEFAULT NULL COMMENT '线路',
  `line_distance` varchar(64) DEFAULT NULL COMMENT '距离(公里)',
  `operator_id` int(11) DEFAULT NULL COMMENT '操作人ID',
  `operator_code` varchar(32) DEFAULT NULL COMMENT '操作人账号',
  `operator_name` varchar(64) DEFAULT NULL COMMENT '操作人名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `yn` int(11) DEFAULT NULL COMMENT '有效标识',
  PRIMARY KEY (`id`),
  KEY `idx_sprov_scity_eprov_ecity` (`start_prov_id`,`start_city_id`,`end_prov_id`,`end_city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=436921 DEFAULT CHARSET=utf8 COMMENT='城市间距离配置表';

-- ----------------------------
-- Records of city_to_city_distance
-- ----------------------------
INSERT INTO `city_to_city_distance` VALUES ('305527', '1', ' 北京', '1', ' 北京', '3', ' 天津', '3', ' 天津', ' 北京天津', ' 152.823', '504284', ' aa', ' aa', '2018-03-07 10:20:17', '2018-03-07 10:20:17', '1');
