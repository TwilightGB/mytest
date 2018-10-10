//初始化


var dataArray = [];// 页面的数据
var dataItem = {};// 页面的数据
/**
 * 可在业务页面初始化OperateLog的数据值来进行查询日志；
 * @type {{billType: string, billCode: string}}
 */
var OperateLog = {
	billType:"",   //单据类型；
	billCode:""   //单据编号；
}

/**
 * 根据单据类型，查询系统操作日志；
 * @param pageNum
 */
OperateLog.initSystemCommonLogPage= function(pageNum) {
	var param ={
	};
	param.billType = OperateLog.billType;
	param.billCode = OperateLog.billCode;
	param.currentPage =pageNum;
	param.pageSize = 1000;
	if(param.billCode && $.trim(param.billCode)!=""){
		this.systemCommonLogQuery(param);
	}
}

/**
 * 根据日志查询对象，查询日志数据；
 * @param param
 */
OperateLog.systemCommonLogQuery = function(param){
	var url = $("#contextPath").val() + "/sys/operate-log/doQuery";
	var self = this;
	CommonClient.post(url,param,function(data){
		if(data == undefined || data == null){
			alert("HTTP请求无数据返回！");
			return;
		}
		if(data.code == 1){// 1:normal
			// alert(JSON.stringify(data));
			var page = data.data;
			dataArray = page.result;
			self.refreshSystemLogDataTable(dataArray);// 刷新页面数据
			//CommonUI.fillPageBar("systemLogCommonPageBarDiv",page,"initSystemCommonLogPage");// 填充分页框
		}
		else if(data.code == 2){//2:warn
			CommonUI.alert("系统提示",data.message,"info");
		}
		else{// 0:exception
			CommonUI.alert("系统提示",data.message,"warning");
		}
	});
}

// 刷新tabel数据
OperateLog.refreshSystemLogDataTable = function(dataArr){
	var tmp = [];// tabel 构建
    for ( var i = 0; i < dataArr.length; i++) {
		var item = dataArr[i];
		tmp.push('<tr>');
		//tmp.push('<td>' + StringUtil.nullToEmpty(item.billTypeName) + '</td>');// 单据类型
	 //  tmp.push('<td>' + StringUtil.nullToEmpty(item.billCode) + '</td>');// 单据编号
		//tmp.push('<td>' +  StringUtil.nullToEmpty(item.billStatusName)  + '</td>');// 单据状态
	//	tmp.push('<td>' + StringUtil.nullToEmpty(item.operateType) + '</td>');//操作类型
		tmp.push('<td>' + StringUtil.nullToEmpty(item.operateDesc) + '</td>');//操作描述
		tmp.push('<td>' + (item.operateResult==1?'成功':'失败') + '</td>');// 操作结果
		tmp.push('<td>' + StringUtil.nullToEmpty(item.operateUserName) + '[' + StringUtil.nullToEmpty(item.operateUserCode) + ']</td>');//操作人
		tmp.push('<td>' + DateUtil.formatDateTime(new Date(item.operateTime)) + '</td>');//操作时间
		tmp.push('</tr>');
	}
    $("#operateLogDataTbody").html(tmp.join(""));
}
