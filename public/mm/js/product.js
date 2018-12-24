$(function () {

    getProductData(LT.getParamsByUrl().productId, function (data) {

        console.log(data)
        $('.loading').remove()
        $('.lt_content .mui-scroll').html(template('product-detail', data))

        //初始化轮播图
        mui('.mui-slider').slider({
            interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
        //区域滚动的初始化
        mui('.mui-scroll-wrapper').scroll({
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });

        //尺码的选择
        $('.btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now')
        })
        //数量加减
        $('.p_number span').on('tap', function () {
            var $input = $(this).siblings('input')
            var maxNum = parseInt($input.attr('data-max'))
            var currentNum = parseInt($input.val())
            //减
            if ($(this).hasClass('jian')) {
                if (currentNum == 0) {
                    mui.toast('不能为负数')
                    return false;
                }
                currentNum--;
            } else {
                //加
                if (currentNum >= maxNum) {
                    console.log('currentNum:' + currentNum + "maxNum:" + maxNum)
                    mui.toast('库存不足')
                    return false;
                }
                currentNum++;
            }
            $input.val(currentNum)
        });

        //添加购物车
        $('.btn_addCart').on('tap', function () {

            var $btn_size = $('.btn_size.now')
            if ($btn_size.length == 0) {
                mui.toast('请选择尺码');
                return false
            }
            var num = $('.p_number input').val()
            if (num == 0) {
                mui.toast('至少选择一件')
                return false
            }

            //提交给后台  /cart/addCart

            LT.ajaxLogin({
                url: '/cart/addCart',
                type: 'post',
                dataType: 'json',
                data: {
                    'productId': LT.getParamsByUrl().productId,
                    'num': num,
                    'size': $btn_size.html()

                },
                success: function (data) {
                    if (data.success == true) {
                        mui.confirm('添加成功，去购物车看看', ['是', '否'], function (e) {
                            if (e.index == 0) {
                                location.href = LT.cartUrl
                            } else {

                            }
                        })

                    }

                }
            })


        })


    })

});

var getProductData = function (productId, callBack) {

    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {id: productId},
        dataType: 'json',
        success: function (data) {
            setTimeout(function () {
                callBack && callBack(data)

            }, 1000)
        }
    })

}