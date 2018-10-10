//初始化
$(document).ready(main);

var dataArray = [];// 页面的数据
var dataItem = {};// 页面的数据

function main() {

    var param = {};
    param.startCityId="1";
    param.endCityId="4";
    doQuery(param);
    //初始化日期控件
    $(".dateTimePicker").datetimepicker({
        format: 'Y-m-d',
        step: 1,
        timepicker: false
    });
    $(".dateTimePicker").val(DateUtil.formatDate(new Date()));

    // 查询按钮单击事件
    $('#queryBtn').click(function () {
        onQueryBtnClick();
    });

    // 导出按钮单击事件
    $('#exportBtn').click(function () {
        onExportBtnClick();
    });


    // 新增按钮单击事件
    $('#addBtn').click(function () {
        document.getElementById("CityToCityDistanceForm").reset();
        $('#inputDialog').modal('show');
        initADD();
    });
    // 同步静态时效
    $('#synStaticAging').click(function () {
        synStaticAgingClick();
    });
    // 取消按钮单击事件
    $("input[name='cancelBtn']").each(function () {
        $(this).click(function () {
            onCancelBtnClick();
        });
    });
    $('#batchDeleteBtn').click(function () {
        // onAddBtnClick();
        batchDelete();
    });
    // 全选按钮单击事件
    $(document).on('click', 'input[name="checkboxItem"]', function () {
        if (this.checked == true) {
            $(this).attr("checked", "checked");
        } else {
            $(this).removeAttr("checked");
            $("input[name='checkboxAll']").removeAttr("checked");
        }
    });

    $(document).on('click', 'input[name="checkboxAll"]', function () {
        if (this.checked == true) {
            $(this).attr("checked", "checked");
            $("#dataTbody").find("input[name='checkboxItem']").attr("checked", "checked");
        } else {
            $(this).removeAttr("checked");
            $("#dataTbody").find("input[name='checkboxItem']").removeAttr("checked");
        }
    });

    // 导入单击事件
    $('#importBtn').click(function () {
        doImportNewPage();
    });

    // 校验
    $("#checkBtn").click(function () {
        if (confirm("确定要校验当前页面数据?")) {
            check(1);
        }
    });
}

function initPage() {

    $('.clear-value').click(function () {
        clearAllSite(startArgs);
    })
}


function check(pageNum) {
    var param = getQureyFormData();

    param.currentPage = pageNum;
    param.pageSize = $("#pageSize").val();
    $("#currentPage").val(pageNum);
    CommonClient.post($("#cityToCityDistancePath").val() + "/check", param, function (result) {
        if (result == undefined || result == null) {
            alert("HTTP请求无数据返回！");
        } else if (result.code == 1) {// 1:normal
            alert("校验完成");
            gotoPage(1);
        } else {// 0:exception, 2:warn
            alert(result.message);
        }
    });
}

function handlerAllSite(args) {
    var nodeCode = $("#" + args.nodeCodeSelectid);
    var name = $("#" + args.nodeNameSelectid).val();
    var nameIsRigth = name == nodeCode.attr(ORG_NAME);
    if (!name || !nameIsRigth) {
        clearAllSite(args);
        $(nodeCode).parent("div").children(".clear-value").css("display", "none");
    }
}

function clearAllSite(args) {
    $("#" + args.nodeNameSelectid).val('');
    $("#" + args.nodeCodeSelectid).val('');
    $("#" + args.nodeCodeSelectType).val('');
    $("#" + args.nodeCodeSelectid).attr(ORG_NAME, '');
    $("#" + args.nodeCodeSelectid).parent("div").children(".clear-value").css("display", "none");
}

function onQueryBtnClick() {
    if (!validateQueryForm()) {
        return;
    }
    gotoPage(1);
}

function validateQueryForm() {
    return true;
}

// 跳转至第几页
function gotoPage(pageNum) {
    subTims =0;
    var param = getQureyFormData();
    param.currentPage = pageNum;
    param.pageSize = $("#pageSize").val();
    $("#currentPage").val(pageNum);
    doQuery(param);
}

function getQureyFormData() {
    var param = {};
    param.startProvId = $.trim($("#startProvId").val());
    param.startCityId = $.trim($("#startCityId").val());

    param.endProvId = $.trim($("#endProvId").val());
    param.endCityId = $.trim($("#endCityId").val());
    return param;
}

function doImport() {
    // 上传excel并查询
    if ($("#fileImp").val() == "") {
        alert("请选择上传的文件！");
        return false;
    }
    var cityToCityDistancePath = $("#cityToCityDistancePath").val();
    $.ajaxFileUpload({
        url: cityToCityDistancePath + "/doImport?impType=in-imp", secureuri: false, fileElementId: 'fileImp', dataType: 'json'
    });
}
function doImportNewPage() {
    $('.active a').css('display','none');
    var url = $("#cityToCityDistancePath").val() + "/import?type=in-imp";
    $("#content").hide();
    $("#dialogFrame").attr("src", url).show();
}
// 查询请求
function doQuery(param) {
    var url = $("#contextPath").val() + "/example/city-to-city/doQuery";
    CommonClient.post(url, param, function (data) {
        if (data == undefined || data == null) {
            alert("HTTP请求无数据返回！");
            return;
        }
        if (data.code == 1) {// 1:normal
            // $("#cityToCityDistanceTable").fixedHeaderTable('destroy');
            $('#dataDiv').find('thead').show();
            var page = data.data;
            dataArray = page.result;
            refreshDataTable(dataArray);// 刷新页面数据
            CommonUI.fillPageBar("pageBarDiv", page, "gotoPage", true);// 填充分页框
            // $("#cityToCityDistanceTable").fixedHeaderTable();
        } else {// 0:exception,2:warn
            alert(data.message);
        }
    });
}



// 返回查询页面
function returnIndex(reload) {
    $("#content").show();
    $("#dialogFrame").removeAttr("src").hide();
    gotoPage(1);
}

/**
 * 点击对话框取消按钮处理
 */
function onCancelBtnClick() {
    dataItem = {};
    $.unblockUI();
    return false;
}

function findItemById(id) {
    for (var i = 0; i < dataArray.length; i++) {
        var item = dataArray[i];
        if (item.transportCostId == id) {
            return item;
        }
    }
    return null;
}

function modifyNewItem(id) {
    if (id == null || id < 1) {
        alert("页面数据丢失，请刷新页面重试！");
        return;
    }
    $('.active a').css('display','none');
    var url = $("#cityToCityDistancePath").val() + "/modifyNew?id=" + id;
    $("#content").hide();
    $("#dialogFrame").attr("src", url).show();
}

function deleteItem(id) {
    if (id == null) {
        alert("页面数据丢失，请刷新页面重试！");
        return;
    }
    var param = {};
    param.id = id;
    if (confirm("确定要删除当前数据吗?")) {
        var url = $("#cityToCityDistancePath").val() + "/delete";
        CommonClient.post(url, param, function (data) {
            if (data == undefined || data == null) {
                alert("HTTP请求无数据返回！");
                return;
            }
            if (data.code == 1) {
                alert(data.message);
                gotoPage($("#currentPage").val());
            } else {
                if (data.code == 2 || data.code == 0) {// 0:exception,2:warn
                    alert(data.message);
                } else {
                    alert("删除失败");
                }
            }
        });
    }
}

function deleAllData() {
    if (confirm("确定要一键清除所有数据吗？")){
        var url = $("#cityToCityDistancePath").val() + "/deleteAllData";
        var param = {};
        CommonClient.post(url, param, function (data) {
            if (data == undefined || data == null) {
                alert("HTTP请求无数据返回！");
                return;
            }
            if (data.code == 1) {
                alert(data.message);
                gotoPage($("#currentPage").val());
            } else {
                if (data.code == 2 || data.code == 0) {// 0:exception,2:warn
                    alert(data.message);
                } else {
                    alert("一键清除失败");
                }
            }
        });
    }

}

function batchDelete() {
    showDisableTimeModel('生效时间', '失效时间', 'dataDiv', "checkboxItem", $("#cityToCityDistancePath").val() + "/batchUpdateDisableTime", function () {
        gotoPage(1);
    });
}
function queryTranspotResourceDetail(waveCode) {
    if (waveCode == null || waveCode < 1) {
        alert("页面数据丢失，请刷新页面重试！");
        return;
    }
    $("#content").hide();
    $("#dialogFrame").attr("src", $("#contextPath").val() + "/vrs/line-resource/list?code=" + waveCode + "&waveType=J").show();
}
// 刷新tabel数据显示
function refreshDataTable(dataArr) {
    var tmp = [];// tabel 构建
    for (var i = 0; i < dataArr.length; i++) {
        var item = dataArr[i];
        tmp.push('<TR class="center" style="">');
        tmp.push('<TD"><input type="checkbox" name="checkboxItem" id="' + item.id + '"></TD>');// 选择列
        tmp.push('<TD>' + StringUtil.nullToEmpty(item.startProvName) + '</TD>');
        tmp.push('<TD>' + StringUtil.nullToEmpty(item.startCityName) + '</TD>');
        tmp.push('<TD>' + StringUtil.nullToEmpty(item.endProvName) + '</TD>');
        tmp.push('<TD>' + StringUtil.nullToEmpty(item.endCityName) + '</TD>');
        tmp.push('<TD>' + StringUtil.nullToEmpty(item.lineName) + '</TD>');
        tmp.push('<TD>' + StringUtil.nullToEmpty(item.lineDistance) + '</TD>');
        tmp.push('<TD nowrap="nowrap">' + DateUtil.formatDateTime(new Date(item.updateTime)) + '</TD>');
        tmp.push('<TD nowrap="nowrap">' + DateUtil.formatDateTime(new Date(item.createTime)) + '</TD>');

        tmp.push('<TD>' + '<button class="btn btn-xs btn-primary" onclick="modifyNewItem(\'' + item.id + '\')">编辑</button>' + '</TD>');
        tmp.push('<TD>' + '<button class="btn btn-xs btn btn-default" onclick="deleteItem(\'' + item.id + '\')">删除</button>' + '</TD>');

        tmp.push('</TR>');
    }
    $("#dataTbody").html(tmp.join(""));
    $("#checkboxAll").removeAttr("checked");
}

function doView(transfersWaveId, waveFuncDesc) {
    document.getElementById("transfersWaveDescForm").reset();
    $('#rowId').val(transfersWaveId);
    $('#waveFuncDescId').val(waveFuncDesc);
    $('#viewDescDialog').modal('show');
}

//保存修改
$('#viewDlgBtn').click(function () {
    var param = {};
    var transfersWaveId = $('#rowId').val();
    var waveFuncDescId = $('#waveFuncDescId').val();
    param.transfersWaveId = transfersWaveId;
    param.waveFuncDesc = waveFuncDescId;
    var url = $("#contextPath").val() + "/vrs/transfers-wave/doUpdateWaveDesc";
    CommonClient.post(url, param, function (data) {
        if (data == undefined || data == null) {
            alert("HTTP请求无数据返回！");
            return;
        }
        if (data.code == 1) {// 1:normal
            $('#viewDescDialog').modal('toggle');
            alert(data.message);
            gotoPage(1);
        } else {// 0:exception,2:warn
            alert(data.message);
        }
    });
});

function replaceData(data, length) {
    if (data && data.length > length) {
        return data.substring(0, length) + "...";
    }
    return StringUtil.nullToEmpty(data);
}

function formateEnableTime(value) {
    if (StringUtil.isEmpty(value)) {
        return "";
    }
    var datetime = DateUtil.formatDate(new Date(value));
    if (datetime.indexOf('9999') > -1) {
        return '长久有效';
    }
    return datetime.split(" ")[0];
}
function formatTime(value) {
    if (StringUtil.nullToEmpty(value)) {
        return value.substring(0, 5);
    }
    return "";
}

/////////////////新增
function getErrorReason(checkState){
    if(checkState == -1){
        return "异常";
    }else if(checkState == 1){
        return "正常";
    }else {
        return "未校验";
    }
}

function initADD(){
    // 保存按钮单击事件
    $('#editDlgBtn').click(function () {
        handleEditDlgBtnClick();
    });

    // 返回按钮单击事件
    $("#cancelBtn").click(function () {
        self.parent.returnIndex(true);
    });
    initTimeSelect();
    $("#waveNumber").change(function () {
        initWaveInfo();
    });
    $("#workBeginTimeHH,#workBeginTimeMM").change(function () {
        initWaveInfo();
    });
}
function initNodeNameAuto() {
    var params = {
        siteType: 2
    };
    var resultFunc = function (event, item) {
        $("#nodeCode").val(item.siteCode);
        $("#nodeNameAuto").val(item.siteName);
        $("#nodeNameAuto").attr("ovalue", item.siteName);
        $("#nodeCodeShow").val(item.siteCode);
        fillNodeInf();
        initWaveInfo();
    };
}

var subTims = 0;
function handleEditDlgBtnClick() {
    var jsonData = serializeForm("CityToCityDistanceForm");
    if (!validateData(jsonData)) {
        return false;
    }
    subTims++;
    if(subTims >1){//防止重复提交
        return ;
    }

    doSubmit();
}

function doSubmit() {
    var param = {};
    fillParam(param);
    var url = "/vrs/tools/city-to-city-distance/doInsert";
    var paramData = {};
    paramData.dataArrJson = JSON.stringify(param);
    CommonClient.post(url, paramData, function (data) {
        if (data == undefined || data == null) {
            alert("HTTP请求无数据返回！");
            return;
        }
        if (data.code == 1) {
            document.getElementById("CityToCityDistanceForm").reset();
            alert("已保存");
            $('#inputDialog').modal('hide');
            gotoPage(1);
        } else {
            alert(data.message);
            subTims = 0;
        }
    });

}
// 校验表单数据
function validateData(jsonData) {
    return commonValidateFormData(jsonData, regExts, validations);
}
