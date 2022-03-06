$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同';
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '确认密码和新密码要相同';
            }
        }
    });

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("重置密码失败");
                }
                layer.msg('重置密码成功');
                // 重置表单
                $('.layui-form')[0].reset();
                // 退出登录
                window.parent.localStorage.removeItem('token');
                // 2.返回登录页面
                window.parent.location.href = '../login.html';
            }
        });
    });


});