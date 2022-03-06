$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称长度为1到6个字符';
            }
        }
    });
    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // 调用for.val快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        });
    }

    // 重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    });

    // 更新用户基本信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败");
                }
                layer.msg("更新用户信息成功");
                // 调用父页面的方法重新渲染用户头像和信息
                parent.window.getUserInfo();
            }
        });
    });
});