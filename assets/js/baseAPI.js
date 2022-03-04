// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    if (options.url.indexOf('/my/') != -1) {
        // 统一为有权限的接口设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载complete回调函数
    // 控制用户访问权限 用户不登陆不能访问后台首页
    options.complete = function(res) {
        // 在complete回调函数中使用responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.跳转到登录页面
            location.href = 'login.html';
        }
    }
});