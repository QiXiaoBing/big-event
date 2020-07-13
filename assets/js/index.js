//获取用户的信息，把信息渲染到页面中
function getUserInfo() {
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        success: function(res) {
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
        },
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
getUserInfo();