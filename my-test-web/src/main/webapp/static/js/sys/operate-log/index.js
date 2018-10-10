//初始化
$(document).ready(main);

var dataArray = [];// 页面的数据
var dataItem = {};// 页面的数据

function main(){
	
	// 查询按钮单击事件
	$('#queryBtn').click(function() {
		onQueryBtnClick();
	});

	//初始化日期控件
	$(".dateTimePicker").datetimepicker({
		format:'Y-m-d H:i:s',
		step:1
	});

	initPage();
}

function initPage(){
	var dict_url = $("#contextPath").val() + "/boss/basic-data/getOptionsFromTmsDict";
	$.post(dict_url,{parentCode:1032,dictLevel:2,dictGroup:1032},function(data){//系统日志单据类型
		CommonUI.appendOptions("billType", data);
	});
	gotoPage(1);
}

function onQueryBtnClick(){
	if( ! validateQueryForm()){
		return;
	}
	gotoPage(1);
}

function validateQueryForm(){
	return true;
}

// 跳转至第几页
function gotoPage(pageNum){
	var param = FormUtil.serializeForm("queryForm");
	
	param.currentPage = pageNum;
	param.pageSize = 30;
	
	$("#currentPage").val(pageNum);
	doQuery(param);
}
/**
 * 查询请求
 */
function doQuery(param){
// alert(JSON.stringify(param));
	var url = $("#contextPath").val() + "/sys/operate-log/doQuery";
	CommonClient.post(url,param,function(data){
		if(data == undefined || data == null){
			alert("HTTP请求无数据返回！");
			return;
		}
		if(data.code == 1){// 1:normal
			// alert(JSON.stringify(data));
			var page = data.data;
			dataArray = page.result;
			refreshDataTable(dataArray);// 刷新页面数据
			CommonUI.fillPageBar("pageBarDiv",page,"gotoPage");// 填充分页框
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
function refreshDataTable(dataArr){
// alert("refreshDataTable-dataArr:" + JSON.stringify(dataArr));
	var tmp = [];// tabel 构建
    for ( var i = 0; i < dataArr.length; i++) {
		var item = dataArr[i];
		tmp.push('<tr>');

		tmp.push('<td>' + StringUtil.nullToEmpty(item.billTypeName)  + '['  + StringUtil.nullToEmpty(item.billType) + ']</td>');// 单据类型
		tmp.push('<td>' + StringUtil.nullToEmpty(item.billCode) + '</td>');// 单据编号
		tmp.push('<td>' + StringUtil.nullToEmpty(item.billStatusName)  + '['  + StringUtil.nullToEmpty(item.billStatus) + ']</td>');// 单据状态
		tmp.push('<td>' + StringUtil.nullToEmpty(item.operateType) + '</td>');//操作类型
		tmp.push('<td>' + StringUtil.nullToEmpty(item.operateDesc) + '</td>');//操作描述
		tmp.push('<td>' + StringUtil.nullToEmpty(item.operateResultName)  + '['  + StringUtil.nullToEmpty(item.operateResult) + ']</td>');// 操作结果
		tmp.push('<td>' + StringUtil.nullToEmpty(item.operateUserName) + '[' + StringUtil.nullToEmpty(item.operateUserCode) + ']</td>');//操作人
		tmp.push('<td>' + DateUtil.formatDateTime(new Date(item.operateTime)) + '</td>');//操作时间

		tmp.push('</tr>');
	}
    $("#dataTbody").html(tmp.join(""));
}
