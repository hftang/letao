window.LT = {}
LT.loginPath = '/mm/user/login.html'
LT.cartUrl='/mm/user/cart.html'

//获取get传过来的参数
LT.getParamsByUrl = function () {

    var paths = {}

    var params = location.search

    if (params) {
        //?name=1&age=10
        params = params.replace('?', '')
        var arr = params.split('&')
        arr.forEach((item, index) => {
            var itemArr = item.split("=")
            paths[itemArr[0]] = itemArr[1]
        })
    }
    return paths;
};
//登录
LT.ajaxLogin = function (params) {
    $.ajax({
        url: params.url || '#',
        type: params.type || 'get',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success: function (data) {
            if (data.error == 400) {
                location.href = LT.loginPath + '?returnUrl=' + location.href;
                return false
            } else {
                params.success && params.success(data)
            }

        },
        error: function () {
            mui.toast('服务器繁忙')
        }
    })


}
