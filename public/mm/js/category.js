$(function () {
    getCategoryData(function (data) {
        console.log(data)
        //    模板的使用顺序 现有json数据 定义模板 调用模板 返回html
        //渲染一级分类列表
        $('.cate_left ul').html(template('firstTemplate', data));
        //渲染一级分类类别第一个对应的商品列表

        var categoryId = $('.cate_left ul li:first-child').attr('data-id')
        getSecondCategoryData({id: categoryId}, function (data) {
            console.log(data)
            $(".cate_right ul").html(template('secondTemplate',data))

        })


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
}