$.ajaxPrefilter(function(options) {
    //更改url
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    //统一配置 complete
    options.complete = function(xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                //说明经过服务器得验证，你使用了一个假token或者过期的
                //删除假token
                localStorage.removeItem('token');
                //跳转到登录页
                location.href = '/login.html';
            }
        }
        //统一配置headers
    options.headers = {
        Authorization: localStorage.getItem('token')
    }
})