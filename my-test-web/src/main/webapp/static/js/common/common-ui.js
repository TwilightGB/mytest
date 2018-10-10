function CommonUI() {
}
CommonUI.prototype = new Object();

// CommonUI.prototype.length = 1;

/**
 * SweetAlert警告框
 */
CommonUI.alert = function(message){
	swal(message);
};
/**
 * SweetAlert警告框
 */
CommonUI.alert = function(message,textUnder){
	swal(message,textUnder);
};
/**
 * SweetAlert警告框
 * alertTypes ['error', 'warning', 'info', 'success']
 * 
 */
CommonUI.alert = function(message,textUnder,alertTypes){
	swal(message, textUnder, alertTypes);
};
/**
 * SweetAlert确认框
 * alertTypes ['error', 'warning', 'info', 'success']
 *
 */
CommonUI.confirm = function (message, textUnder, alertTypes, confirmFunc) {
	swal({
		title: message,
		text: textUnder,
		type: alertTypes,
		showCancelButton: true,
		cancelButtonText: "取消",
		confirmButtonText: "确定"
	}, function (isConfirm) {
		if (isConfirm) {
			confirmFunc();
		}
	});
};

/**
 * 向下拉列表(select)追加选项
 * @author suihonghua
 * @param eleId			elementId
 * @param labelValues	LabelValue集合
 */
CommonUI.appendOptions = function(eleId,labelValues){
	var tmp = [];
	// 循环组装下拉框选项
	$.each(labelValues, function(k, v){
		tmp.push('<option value="' + v.value + '">' + v.label + '</option>');
	});
	$("#" + eleId).append(tmp.join(''));
};

/**
 * JQuery-UI中autocomplete插件初始化
 *（http://jqueryui.com/autocomplete）
 *
 * @param eleId
 * @param datas
 * @param options
 */
CommonUI.initAutocomplete = function (eleLabel, eleValue, data, options) {

	// 默认设置
	var defaultOptions = {
		minLength: 0,
		selectLabelAttr: "selectLabel",//选中数据时存放label的属性名
		selectValueAttr: "selectValue",//选中数据时存放value的属性名
		eleValue:eleValue,
		response: function( event, ui ) {
			console.log("response");
		},
		create : function(event, ui) {
			console.log("create");
		},
		//当提示列表中的某一项获取焦点时触发此事件,其中ui.item就是获得焦点的那一项
		//只有使用键盘选择某一项时，才会更新文本框中的值，使用鼠标不更新文本框的值，但是都会触发此事件
		focus : function(event, ui) {
			console.log("focus:" + ui.item.value);
		},
		//当提示列表打开后触发此事件,ui是空的对象
		open : function(event, ui) {
			console.log("open");
		},
		//在minLength满足后，delay之后会首先触发该事件，具体作用不详，传进来的ui是一个空的对象
		search : function(event, ui) {
			console.log("search");
		},
		//当列表中的某一个像被选中后触发此事件，参数和focus是一样的
		select: function( event, ui ) {
			console.log("select:" + ui.item.value);
		},
		change : function(event, ui) {
			console.log("change");
		},
		close: function( event, ui ) {
			console.log("close");
		}
	};

	// 将客户设置的options继承进来
	if (options != null && options != undefined) {
		$.extend(defaultOptions, options);
	}
	try{//初始化之前首先销毁之前的自动补全设置
		$( "#" + eleLabel ).autocomplete( "destroy" );
	}catch(e){
		console.log("autocomplete-error:" + e.message);
	}
	//初始化autocomplete控件
	$( "#" + eleLabel ).autocomplete({
		minLength: defaultOptions.minLength,
		source: data,
		messages : {
			noResults: '',
			results: function() {}
		},
		response: function( event, ui ) {
			defaultOptions.response(event, ui);
		},
		create : function(event, ui) {
			defaultOptions.create(event, ui);
		},
		//当提示列表中的某一项获取焦点时触发此事件,其中ui.item就是获得焦点的那一项
		//只有使用键盘选择某一项时，才会更新文本框中的值，使用鼠标不更新文本框的值，但是都会触发此事件
		focus : function(event, ui) {
			$( "#" + eleLabel ).val( ui.item.label );//默认会将value值显示在文本框中，改为显示label
			defaultOptions.focus(event, ui);
		},
		//当提示列表打开后触发此事件,ui是空的对象
		open : function(event, ui) {
			defaultOptions.open(event, ui);
		},
		//在minLength满足后，delay之后会首先触发该事件，具体作用不详，传进来的ui是一个空的对象
		search : function(event, ui) {
			defaultOptions.search(event, ui);
		},
		//当列表中的某一个像被选中后触发此事件，参数和focus是一样的
		select: function( event, ui ) {
			$( "#" + eleLabel ).attr(defaultOptions.selectLabelAttr, ui.item.label );
			$( "#" + eleLabel ).attr(defaultOptions.selectValueAttr, ui.item.value );
			$( "#" + eleLabel ).val(ui.item.label);
			$( "#" + eleValue ).val(ui.item.value);
			defaultOptions.select(event, ui);
			return false;
		},
		change : function(event, ui) {
			if($.trim($( "#" + eleLabel ).val()) == ""){//如果文本框已经空了，需要清空隐藏域的值
				$( "#" + eleLabel ).attr(defaultOptions.selectLabelAttr, "");
				$( "#" + eleLabel ).attr(defaultOptions.selectValueAttr, "");
				$( "#" + eleLabel ).val("");
				$( "#" + eleValue ).val("");
			}else{
				$( "#" + eleLabel ).val($( "#" + eleLabel ).attr(defaultOptions.selectLabelAttr));
				$( "#" + eleValue ).val($( "#" + eleLabel ).attr(defaultOptions.selectValueAttr));
			}
			defaultOptions.change(event, ui);
		},
		close: function( event, ui ) {
			defaultOptions.close(event, ui);
		}
	});

	//文本框获取焦点后打开下拉框
	$( "#" + eleLabel ).focus(function() {
		console.log("ele-focus:" + eleLabel);
		$("#" + eleLabel ).autocomplete( "search", "" );
	});

	//当文本框改变为空时，将KEY也至空；
	$( "#" + eleLabel).change(function(){
		console.log("ele-change:" + eleLabel);
		if($.trim($( "#" + eleLabel ).val()) == ""){//如果文本框已经空了，需要清空隐藏域的值
			$( "#" + eleLabel ).attr(defaultOptions.selectLabelAttr, "");
			$( "#" + eleLabel ).attr(defaultOptions.selectValueAttr, "");
			$( "#" + eleLabel ).val("");
			$( "#" + eleValue ).val("");
		}else{
			$( "#" + eleLabel ).val($( "#" + eleLabel ).attr(defaultOptions.selectLabelAttr));
			$( "#" + eleValue ).val($( "#" + eleLabel ).attr(defaultOptions.selectValueAttr));
		}
	});
};

/**
 * 自动补全下拉框
 * （http://bassistance.de/jquery-plugins/jquery-plugin-autocomplete/）
 * @param eleId 元素ID
 * @param datas 数据数组或数据URL
 * @param options 属性设置
 */
CommonUI.autocomplete = function (eleId, datas, options) {
	// 默认设置
	var defaultOptions = {
		minChars : 0, // 在触发autoComplete前用户至少需要输入的字符数
		max : 10000, // autoComplete下拉显示项目的个数
		delay : 200, // 击键后激活autoComplete的延迟时间(单位毫秒)
		matchContains : true, // 决定比较时是否要在字符串内部查看匹配，如ba是否与foo bar中的ba匹配
		selectFirst : true, // 如果设置成true,在用户键入tab或return键时autoComplete下拉列表的第一个值将被自动选择,尽管它没被手工选中(用键盘或鼠标).
		extraParams : {}, // 为后台(一般是服务端的脚本)提供更多的参数
		formatItem : function(row, i, max) {
			return row.label;
		},
		formatMatch : function(row, i, max) {
			return row.label + " " + row.value;
		},
		formatResult : function(row) {
			return row.label;
		},
		handleResult : function(event, data, formatted) {// 处理结果[自定义方法，非autocomplete内置]
			alert(data.value);
			alert(data.label);
		}
	};
	// 将客户设置的options继承进来
	if (options != null && options != undefined) {
		$.extend(defaultOptions, options);
	}
	//去掉原来的自动补全
	$("#" + eleId).unautocomplete();
	// 如果datas类型是string，代表数据url地址
	if (typeof (datas) == "string") {
		var url = datas;
		var param = {};
		$.post(url, param, function(data) {
			if (data == undefined || data == null) {
				alert("HTTP请求无数据返回！");
				return;
			}
			// 初始化autocomplete组件
			$("#" + eleId).autocomplete(data, defaultOptions);
		});
	} else {
		// 初始化autocomplete组件
		$("#" + eleId).autocomplete(datas, defaultOptions);
	}
	if (defaultOptions.handleResult) {
		$("#" + eleId).result(defaultOptions.handleResult);
	}
};

/**
 * 填充分页框
 * 
 * elementId	所填充的元素ID
 * page			Page对象
 * clickFunction 点击分页时调用的函数名（String类型）
 */
CommonUI.fillPageBar = function(elementId, page, clickFunction){
	var pagebar_html = this.getPageBarHtml(clickFunction, page.totalRow, page.currentPage, page.totalPage);
	$("#"+elementId).html(pagebar_html);
};

/**
 * 获得分页框Html
 * 
 * clickFunction 点击分页时调用的函数名（String类型）
 * totalRow 	分页总条数
 * currentPage	当前页数
 * totalPage	分页总页数
 */
CommonUI.getPageBarHtml = function(clickFunction, totalRow, currentPage, totalPage){
	var tmp = [];// html 构建
	var start = 0;
	var end = 0;
	
	//计算页码
	if(totalPage > 3){
		start = currentPage - 1;
		if(start < 1){
			start = 1;
		}
		end = start + 2;
		if(end > totalPage){
			end = totalPage;
			start = end - 2;
		}
	}else{
		start = 1;
		end = totalPage;
	}
	var _prePage = start - 1;
	var _nextPage = end + 1;
	var prePage = currentPage - 1;
	var nextPage = currentPage + 1;
	
	//构建html
	tmp.push('<div class="row">');
	tmp.push('<div class="col-sm-4">');
	tmp.push('<div class="dataTables_info">&nbsp;&nbsp;&nbsp;共&nbsp;'+totalPage+'&nbsp;页，&nbsp;'+ totalRow +'&nbsp;条数据&nbsp;&nbsp;&nbsp;</div>');
	tmp.push('</div>');
	tmp.push('<div class="col-sm-8">');
	tmp.push('<div class="dataTables_paginate paging_bootstrap">');
	tmp.push('<ul class="pagination">');
	
	if(currentPage>1){
		tmp.push('<li class="prev"><a href="#" title="首页" onclick="' + clickFunction + '(1)"><i class="icon-step-backward middle"></i></a></li>');//首页
		tmp.push('<li class="prev"><a href="#" title="上一页" onclick="' + clickFunction + '(' + prePage + ')"><i class="icon-caret-left middle"></i></a></li>');//上一页
	}else{
		tmp.push('<li class="prev disabled"><a href="#" title="首页"><i class="icon-step-backward middle"></i></a></li>');//首页
		tmp.push('<li class="prev disabled"><a href="#" title="上一页"><i class="icon-caret-left middle"></i></a></li>');//上一页
	}
	if(_prePage>0){
		tmp.push('<li><a href="#">...</a></li>');
	}
	for ( var idx = start; idx <= end; idx++) {
		if(idx == currentPage){
			tmp.push('<li class="active"><a href="#">'+idx+'</a></li>');
		}
		else{
			tmp.push('<li><a href="#" onclick="' + clickFunction + '(' + idx + ');">' + idx + '</a></li>');
		}
	}
	if(_nextPage <= totalPage){
		tmp.push('<li><a href="#">...</a></li>');
	}
	if(currentPage < totalPage){
		tmp.push('<li class="next"><a href="#" title="下一页" onclick="' + clickFunction + '(' + nextPage + ')"><i class="icon-caret-right middle"></i></a>');//下一页
		tmp.push('<li class="next"><a href="#" title="末页" onclick="' + clickFunction + '(' + totalPage + ')"><i class="icon-step-forward middle"></i></a>');//末页
	}
	else{
		tmp.push('<li class="next disabled"><a href="#" title="下一页"><i class="icon-caret-right middle"></i></a>');//下一页
		tmp.push('<li class="next disabled"><a href="#" title="末页"><i class="icon-step-forward middle"></i></a>');//末页
	}
	
	tmp.push('</ul>');
	tmp.push('</div>');
	tmp.push('</div>');
	tmp.push('</div>');
	return tmp.join("");
};

