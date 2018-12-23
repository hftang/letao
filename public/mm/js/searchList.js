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
    //3获取查询数据  因为下拉刷新是自动的 所以这步可以省略
    // getSearchDatas({
    //     proName: $input.val(),
    //     page: 1,
    //     pageSize: 4
    // }, function (data) {
    //     console.log(data)
    //     $('.lt_product').html(template('list', data))
    //
    // })
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

    });

    //6 下拉刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                // style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                // color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                // height:'50px',//可选,默认50px.下拉刷新控件的高度,
                // range:'100px', //可选 默认100px,控件可下拉拖拽的范围
                // offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次 这样做后 第二步就可以不用去做了
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function () {
                    that = this
                    //去掉条件 和 箭头字体样式
                    $('.lt_ordeer a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
                    //重新获取数据 然后关闭刷新
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
                        setTimeout(function () {
                            console.log(data)
                            that.endPulldownToRefresh()
                            $('.lt_product').html(template('list', data))

                        }, 900)

                    })


                }
            },
            //上拉加载更多
            up: {
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',
                callback: function () {
                    var that = this
                    window.page++
                    var key = $.trim($input.val())
                    if (!key) {
                        mui.toast('请输入关键字')
                        return false;
                    }
                    var params={
                        proName: key,
                        page: window.page,
                        pageSize: 4,
                    }
                    var dataType = $('.lt_ordeer a.now').attr('data-order');
                    var dataValue = $('.lt_ordeer a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;

                    params[dataType]=dataValue

                    getSearchDatas(params, function (data) {
                       setTimeout(function () {

                           //加载更多这里是追加
                           $('.lt_product').append(template('list', data))

                           if (data.data.length) {
                               console.log('---> stop')
                               //停止加载
                               that.endPullupToRefresh(false)
                           } else {
                               console.log('---> add')
                               //停止加载
                               that.endPullupToRefresh(true)

                               //上拉重置
                               that.refresh(true)
                           }
                       },800)

                    })

                }
            }
        }
    });


});

var getSearchDatas = function (params, callBack) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            //记录下page
            window.page = data.page
            console.log("page:" + data.page)

            callBack && callBack(data)

        }
    })

}





