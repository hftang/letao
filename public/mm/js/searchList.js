$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false, //是否显示滚动条
    });
//1获取带过来的参数值
    console.log()
    var params = window.LT.getParamsByUrl()
    //2把获取到的传参给input赋值
    var $input = $('input').val(params.key || '')
    //3获取查询数据
    getSearchDatas({
        proName: $input.val(),
        page: 1,
        pageSize: 4
    }, function (data) {
        console.log(data)
        $('.lt_product').html(template('list', data))

    })
    //4点击搜索 对关键字进行搜索
    $('.search-btn').on('tap', function (e) {
        var key = $.trim($input.val())
        if (!key) {
            mui.toast('请输入关键字')
            return false;
        }
        getSearchDatas({
            proName: key,
            page: 1,
            pageSize: 4
        }, function (data) {
            console.log(data)
            $('.lt_product').html(template('list', data))
        })

    });
    //5 点击排序
    $('.lt_ordeer a').on('tap', function () {
        //给当前的a添加now 其余的slidings 去掉 now
        // $(this).addClass('now').siblings().removeClass('now')

        var $this = $(this)
        //判断是否有now
        //没有now的情况
        if (!$this.hasClass('now')) {
            $this.addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        else {
            //有now的情况下 改变下箭头方向

            if ($this.find('span').hasClass('fa-angle-up')) {
                //朝上的remove up 改成 朝下
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down')

            } else {
                //朝下的  移除朝下 改成 朝上
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
            }

        }

        //获取到你 点击的类型 data-order
        var dataType = $this.attr('data-order');
        var dataValue = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
        var key = $.trim($input.val())
        if (!key) {
            mui.toast('请输入关键字')
            return false;
        }
        //组装json
        var params = {
            proName: key,
            page: 1,
            pageSize: 4,
        }
        params[dataType] = dataValue
        getSearchDatas(params, function (data) {

            $('.lt_product').html(template('list', data))
        })

    })


});

var getSearchDatas = function (params, callBack) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {

            callBack && callBack(data)

        }
    })

}





