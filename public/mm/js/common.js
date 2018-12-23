window.LT = {}

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
}
