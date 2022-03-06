$(function() {
    // 获取用户基本信息
    getUserInfo();
    // 退出功能
    $('#btn-ogout').on('click', function() {
        layui.layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
            exit();
            // 关闭弹出层
            layer.close(index);
        });
    });

});

// 退出功能
function exit() {
    // 当用户点击确定时退出
    // 1.清空本地存储中的token
    localStorage.removeItem('token');
    // 2.返回登录页面
    location.href = 'login.html';
}

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            renderAvatar(res.data);
        }
    });
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的用户名
    var name = user.nickname || user.username;
    $('#welcom').html('欢迎&nbsp&nbsp' + name);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 用户有头像 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 用户没有头像，渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}