/**
 * 通用数据客户端
 * @returns {CommonClient}
 */
function CommonClient(){}

CommonClient.prototype = new Object();
//上下文路径
CommonClient.contextPath = "";

/**
 * Ajax[GET] 异步数据请求
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 */
CommonClient.get = function(url,param,successFunction){
	CommonClient.ajax("GET", url, param, successFunction);
};

/**
 * Ajax[POST] 异步数据请求
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 */
CommonClient.post = function(url,param,successFunction){
	CommonClient.ajax("POST", url, param, successFunction);
};

/**
 * Ajax 异步数据请求
 * @param type	[String] e.g.:"POST" or "GET"
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 */
CommonClient.ajax = function(type,url,param,successFunction){
	CommonClient.ajax(type, url, param, successFunction,true);
};

/**
 * Ajax[GET] 同步数据请求
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 */
CommonClient.syncGet = function(url,param,successFunction){
	CommonClient.syncAjax("GET", url, param, successFunction);
};

/**
 * Ajax[POST] 同步数据请求
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 */
CommonClient.syncPost = function(url,param,successFunction){
	CommonClient.syncAjax("POST", url, param, successFunction);
};

/**
 * Ajax 同步数据请求
 * @param type	[String] e.g.:"POST" or "GET"
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 */
CommonClient.syncAjax = function(type,url,param,successFunction){
	CommonClient.ajax(type, url, param, successFunction,false);
};

/**
 * Ajax 同步数据请求
 * @param type	[String] e.g.:"POST" or "GET"
 * @param url	[String] 请求url
 * @param param	[Object] 参数
 * @param successFunction [Function] 成功回调函数
 * @param async [boolean] 是否异步
 */
CommonClient.ajax = function(type,url,param,successFunction,async){
	if(param == null){
		param = {};
	}
	param.t_i_m_e = new Date().getTime();//防止请求使用缓存数据
	jQuery.ajax({
		type: type,
		url: CommonClient.contextPath + url,
		data: param,
		cache: false,
		async: async,
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		beforeSend: function(jqXHR, settings){
			$.blockUI({ message:"<span class='pl20 icon-loading'>正在努力为您加载...</span>",
				css: {
					border: 'none',
					padding: '15px',
					backgroundColor: '#fff',
					'-webkit-border-radius': '10px',
					'-moz-border-radius': '10px',
					opacity: .5,
					color: '#000'
				},
				fadeIn: 100,
				fadeOut: 100
			});
		},
		success: successFunction,
		error: function(jqXHR, textStatus, errorThrown){
			if(jqXHR.status > 0){
				alert("["+jqXHR.status+"]"+ jqXHR.statusText );
			}
		},
		complete: function(jqXHR, textStatus){
			$.unblockUI();
		}
	});
};

