$(function () {


    $('#mylogin').on('tap', function () {


        var serializeStr = $('form').serialize()
        var obj = LT.serialize2Object(serializeStr)


        //数据的校验
        if (!obj.username) {
            mui.toast('用户名不能为空')
            return false
        }
        if (!obj.password) {
            mui.toast('密码不能为空')
            return false
        }

        //登录ajax
        $.ajax({
            url: '/user/login',
            type: 'post',
            dataType: 'json',
            data: obj,
            success: function (data) {

                console.log('失败' + data)
                if (data.success == true) {

                    var returnUrl = location.search.replace('?returnUrl=', '')
                    if (returnUrl) {
                        location.href = returnUrl
                    } else {
                        location.href = LT.userUrl
                    }

                } else {
                    mui.toast(data.message)
                }

            },
            error: function (data) {
                console.log("hftang:" + data)

            }
        })
    })
})
