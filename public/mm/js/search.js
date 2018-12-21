$(function () {
    $('.lt_search a').on('tap', function (e) {

        //带着关键词 跳转到搜索中心

        const keyword = $.trim($('.lt_search input').val())
        if (!keyword) {
            mui.toast('请输入关键字')
            return
        }

        location.href = 'searchList.html?key=' + keyword;


    })
});