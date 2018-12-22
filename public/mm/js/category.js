
$(function () {
    getCategoryData(function (data) {
        //模板的使用顺序 现有json数据 定义模板 调用模板 返回html
        //渲染一级分类列表
        $('.cate_left ul').html(template('firstTemplate', data));
        //设置点击事件
        // setLiTipEvents();
        //渲染一级分类类别第一个对应的商品列表
        var categoryId = $('.cate_left ul li:first-child').attr('data-id')
        render(categoryId)

    });

    //给左边的添加点击事件 因为有渲染的延时 所以这里提供2种方式

    // var setLiTipEvents = function () {
    //
    //     $(".cate_left li").on('tap', function (e) {
    //         console.log(e)
    //
    //     })
    //
    // };
    $('.cate_left').on('tap', 'li', function (e) {
        //判断如果当前已经是now选中状态 就不要在去执行请求数据
        if ($(this).hasClass('now')) {
            return
        }

        var cateId = $(this).attr('data-id')
        $(".cate_left ul li").removeClass('now')
        $(this).addClass('now')
        render(cateId)

    })

})


//获取一级分类
var getCategoryData = function (callBack) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: "",
        dataType: "json",
        success: function (data) {
            callBack && callBack(data);
        }
    });
};
//获取二级分类的列表
var getSecondCategoryData = function (params, callBack) {

    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            callBack && callBack(data)
        }
    })
};
//渲染二级列表
var render = function (categoryId) {

    getSecondCategoryData({id: categoryId}, function (data) {
        console.log(data)
        $(".cate_right ul").html(template('secondTemplate', data))

    });

};
