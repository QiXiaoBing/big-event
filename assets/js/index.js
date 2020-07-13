//获取用户的信息，把信息渲染到页面中
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status === 0) {
                // console.log(res);
                //设置欢迎语
                //有呢称，优先使用昵称，没有呢称，使用账号
                var name = res.data.nickname || res.data.username;
                $('.username').html('&nbsp;&nbsp' + name);
                //设置头像
                //有图片，优先使用图片，没有图片，使用name得第一个字符
                if (res.data.user_pic) {
                    //说明有图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                    $('.text-avatar').hide();
                } else {
                    //说明没有图片
                    var firstWord = name.substr(0, 1).toUpperCase(); //截取，对中文也有效，中文转大写不会报错
                    $('.text-avatar').text(firstWord).css('display', 'inline-block');
                    $('.layui-nav-img').hide();
                }
            }

        },
        // //ajax请求结束后（无论成功还是失败），会执行complete函数
        // complete: function(xhr) {
        //     if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
        //         //说明经过服务器得验证，你使用了一个假token或者过期的
        //         //删除假token
        //         localStorage.removeItem('token');
        //         //跳转到登录页
        //         location.href = '/login.html';
        //     }
        // },
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // }
    })
}
getUserInfo();
//退出功能
//如果
$('#logout').click(function() {
    layer.confirm('确定要退出码', function(index) {
        //1.删除token  2.跳转到/login.html
        localStorage.removeItem('token');
        location.href = '/login.html';
        //关闭窗口
        layer.close(index);
    })
})