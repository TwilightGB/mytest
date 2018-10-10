/**
 * 时间处理工具类
 * 
 * @returns {DateUtil}
 */
function DateUtil() {
}
DateUtil.prototype = new Object();

// DateUtil.prototype.length = 1;

/**
 * 格式化日期时间
 * 
 * @param d
 *            Date实例
 * @returns string 格式如：2001-01-01 01:01:01
 */
DateUtil.formatDateTime = function(date) {
	return this.format(date, "yyyy-MM-dd HH:mm:ss");
};

/**
 * 格式化日期
 * 
 * @param d
 *            Date实例
 * @returns string 格式如：2001-01-01
 */
DateUtil.formatDate = function(date) {
	return this.format(date, "yyyy-MM-dd");
};

/**
 * 格式化时间
 * 
 * @param d
 *            Date实例
 * @returns string 格式如：01:01:01
 */
DateUtil.formatTime = function(date) {
	return this.format(date, "HH:mm:ss");
};

/**
 * 时间格式化 e.g. var testDate = new Date( 1320336000000 );//这里必须是整数，毫秒
 * 
 * var testStr1 = DateUtil.format(testDate, "yyyy年MM月dd日HH小时mm分ss秒"); var
 * testStr2 = DateUtil.format(testDate, "yyyy-MM-dd HH:mm:ss.S"); var testStr3 =
 * DateUtil.format(testDate, "yyyy-MM-dd HH:mm:ss"); alert(testStr1);
 * alert(testStr2); alert(testStr3);
 * 
 * @param date
 * @param format
 * @returns
 */
DateUtil.format = function(date, format) {
	try {
		// yyyy年MM月dd日 HH小时mm分ss秒
		var o = {
			"M+" : date.getMonth() + 1, // month
			"d+" : date.getDate(), // day
			"H+" : date.getHours(), // hour
			"m+" : date.getMinutes(), // minute
			"s+" : date.getSeconds(), // second
			"q+" : Math.floor((date.getMonth() + 3) / 3), // quarter
			"S" : date.getMilliseconds()
		// millisecond
		};

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		}
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
						: ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	} catch (e) {
		return "";
	}
};

/**
 * 解析为Data类型(目前string只支持标准格式)
 * 
 * @param val
 *            参数(int or string)
 * @returns Date
 */
DateUtil.parse = function(val) {
	if (typeof (val) == "number") {
		return new Date(val);
	} else if (typeof (val) == "string") {
		return new Date(Date.parse(val.replace(/-/g, "/")));
	}
	return null;
};

/**
 * 字符串工具类
 *
 * @returns {StringUtil}
 * 
 */
function StringUtil() {
}
StringUtil.prototype = new Object();

// StringUtil.prototype.length = 1;

StringUtil.nullToEmpty = function(str) {
	return str == null ? "" : str;
};

/**
 * 如果字符串为空，则用默认值
 * @param str
 * @param def
 * @returns {string}
 */
StringUtil.nullToDefault = function(str, def) {
    return !str ? def : str;
};

StringUtil.isEmpty = function(str) {
	if (null == str || '' == str) {
		return true;
	}
	return false;
};

StringUtil.trim = function(str) {
	return str.replace(/(^[\s]*)|([\s]*$)/g, "");
};

StringUtil.trimLeft = function(str) {
	return str.replace(/(^[\s]*)/g, "");
};

StringUtil.trimRight = function(str) {
	return str.replace(/([\s]*$)/g, "");
};

StringUtil.replaceAll = function(str, s1, s2) {
	return str.replace(new RegExp(s1, "gm"), s2);
};

StringUtil.startWith = function(str, s) {
	if (str == null || s == '' || str.length == 0 || s.length == 0)
		return false;
	if (str.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
};

/**
 * Map实现类(详细使用请阅读代码，非Java原版Map)
 * @returns {Map}
 * 
 */
function Map() {
	this.container = new Object();
}

Map.prototype.putAll = function(map) {
	var keyset = map.keySet();
	for ( var i = 0; i < keyset.length; i++) {
		var key = keyset[i];
		this.put(key, map.get(key));
	}
};

Map.prototype.put = function(key, value) {
	this.container[key] = value;
};

Map.prototype.get = function(key) {
	return this.container[key];
};

Map.prototype.keySet = function() {
	var keyset = [];
	for ( var key in this.container) {
		keyset.push(key);
	}
	return keyset;
};

Map.prototype.size = function() {
	var keyset = this.keySet();
	return keyset.length;
};

Map.prototype.containsKey = function(key) {
	for ( var _key in this.container) {
		if (_key == key) {
			return true;
		}
	}
	return false;
};

Map.prototype.toString = function() {
	var str = "";
	for ( var key in this.container) {
		str += key + ":" + this.container[key] + ",";
	}
	if (str.length > 0) {
		str = str.substring(0, str.length - 1);
	}
	str = "{" + str + "}";
	return str;
};

Map.valueOf = function(obj) {
	var map = new Map();
	for ( var key in obj) {
		map.put(key, obj[key]);
	}
	return map;
};

/**
 * 正则验证工具类
 * @returns {RegexUtil}
 */
function RegexUtil() {
}
RegexUtil.prototype = new Object();

/**
 * 验证参数是否是有效URL
 * 
 * @param url
 * @return
 */
RegexUtil.isUrl = function(url) {
	var strRegex = "^((https|http|ftp|rtsp|mms)://)?([a-z0-9A-Z]{0,10}\.)?[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
	var re = new RegExp(strRegex);
	if (re.test(url)) {
		return true;
	} else {
		return false;
	}
};
/**
 * 根据名称判断是否是直辖市
 * @param name
 * @returns {boolean}
 */
RegexUtil.isMunicipality = function(str){
    var reg = /^(北京|上海|天津|重庆)/;
	return reg.test(str);
};
/**
 * 校验是否是数字或带小数点数字
 * @param name
 * @returns {boolean}
 */
RegexUtil.isNumber = function(str){
    var reg = /^(\d{1,8})(\.\d{1,2})?$/;
	return reg.test(str);
};

/**
 * 校验是否是数字或带小数点数字
 * @param str  要校验的字符串
 * @param scale  最多可以有几位小数
 * @param negative 是否可以为负数
 * @returns {boolean}
 */
RegexUtil.isNumber = function(str, scale, negative){
	if(!scale || scale < 0){
		scale = 2;
	}
	var reg = null;
	if (negative == 1) {
		reg = new RegExp("^\\-?(\\d{1,8})(\\.\\d{1," + scale + "})?$");
	} else {
		reg = new RegExp("^(\\d{1,8})(\\.\\d{1," + scale + "})?$");
	}
	return reg.test(str);
};

/**
 * 校验输入的字符串是否是身份证号
 * @param card
 */
RegexUtil.isPersonCard = function(str){
	var reg = /^(\d{15}$)|(^\d{17}(\d|X|x))$/;
	return reg.test(str);
};

/**
 * 校验是否正整数
 * @param name
 * @returns {boolean}
 */
RegexUtil.isInteger = function(str){
	var reg = /^\d+$/;
	return reg.test(str);
};

/**
 * 校验是否是电话号码，匹配国内电话号码(0511-4405222 或 021-87888822)
 * @param str
 * @returns {boolean}
 */
RegexUtil.isPhone = function(str) {
	var reg = /^\d{3,4}-\d{7,8}$/;
	return reg.test(str);
};

/**
 * 校验是否是手机号码
 * @param str
 * @returns {boolean}
 */
RegexUtil.isMobile = function(str) {
	var reg =/^1[1-9]{1}[0-9]{9}$/;
	return reg.test(str);
};

/**
 * 表单工具类
 *
 * @returns {FormUtil}
 */
function FormUtil() {
}
FormUtil.prototype = new Object();

/**
 * 序列化表单数据
 *
 * @param formId
 * @return
 */
FormUtil.serializeForm = function(formId) {
	var param = {};
	var serializeArray = $("#" + formId).serializeArray();
	$.each(serializeArray, function(index, field){
		var name = field.name;
		var value = $.trim(field.value);
		param[name] = value;
	});
	return param;
};

/**
 * 页面打印工具类
 * @constructor
 */
function PrintUtil(){

};
PrintUtil.prototype = new Object();

/**
 * 页面显示二维码
 * @param elmId   二维码显示区域的ID，各种HTML元素均可(最好是div. img可能在chrome浏览器里显示不出来)
 * @param params
 * {
 *    text : "我是二维码",   //二维码包含的内容
 *    height : 120,          //二维码的高度
 *    width : 120            //二维码的宽度
 * }
 * @also 需要引入jQuery plugin： #springUrl("")/static/js/plugins/jquery.qrcode.min.js
 * @see 更多参数参考：https://github.com/jeromeetienne/jquery-qrcode
 */
PrintUtil.qrcode = function(elmId, params){
	$("#" + elmId).qrcode(params);
}

/**
 * 页面显示条形码
 * @param elmId      条形码显示区域的ID，各种HTML元素均可(最好是div. img可能在chrome浏览器里显示不出来)
 * @param content    条形码包含的内容
 * @param format     条形码的格式，默认code128
 * @param params
 * {
 * 		barWidth: 1,      //条形码的宽度
 * 	    barHeight: 50     //条形码的高度
 * }
 * @also 需要引入jQuery plugin： #springUrl("")/static/js/plugins/jquery-barcode.js
 * @see 更多参数参考： https://github.com/jbdemonte/barcode
 * @see 使用例子：http://www.w3dev.cn/article/20140108/jquery-barcode-plugin.aspx
 */
PrintUtil.barcode = function(elmId, content, format, params){
	if(!format) { format = "code128";}
	$("#" + elmId).barcode(content, format, params);
}