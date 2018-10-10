var TOP_MENU_HEIGHT = 50;//顶部导航的高度
var BOTTOM_HEIGHT = 34;//底部高度
var LEFT_MENU_WIDTH = 220;//左侧菜单宽度

var leftMenuMargin = 0;
$(function () {
    pageResize();
    $(window).resize(pageResize);
    InitDom();
})

//窗口在进行缩放时页面的处理
function pageResize() {
    $("div.e_rightMain").width($(window).width() - leftMenuMargin - LEFT_MENU_WIDTH);
    var rightContentHeight = $(window).height() - TOP_MENU_HEIGHT - BOTTOM_HEIGHT;
    $("div.e_contant").height(rightContentHeight);
    $("div.e_rightMain").height(rightContentHeight);
}

//初始化相关dom节点操作
function InitDom() {
    $("div.e_menu h2").click(foldUnfoldMenu);
    $("div.e_menu li").click(selectOneMenu);
    $("div.e_control").click(leftControl);
}

//展开收起菜单
function foldUnfoldMenu() {
    if ($(this).parent().hasClass("e_open")) {//收起
        $(this).parent().removeClass("e_open");
        $(this).siblings("ul").slideUp();
    }
    else {//展开
        var $siblings = $(this).parents("div.e_box").siblings("div.e_box");
        $siblings.removeClass("e_open");
        $siblings.children("ul").slideUp();
        $(this).parent().addClass("e_open");
        $(this).siblings("ul").slideDown();
    }
}

//选中某一个菜单
function selectOneMenu() {
    $("div.e_menu li").removeClass("now");
    $(this).addClass("now");
}

//左侧菜单控制
function leftControl() {
    if ($(this).children("i").hasClass("gArrowLSS")) {//收起
        $(this).parent().css("marginLeft", "-220px");
        $(this).children("i").removeClass().addClass("gArrowRSS");
        $(this).attr("title", "展开左侧菜单");
        leftMenuMargin = -220;
    }
    else {//展开
        $(this).parent().css("marginLeft", 0);
        $(this).children("i").removeClass().addClass("gArrowLSS");
        $(this).attr("title", "收起左侧菜单");
        leftMenuMargin = 0;
    }
    pageResize();
}