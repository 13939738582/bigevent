$(function() {
    // 定义一个查询的参数对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    inittable();
    // 获取文章列表数据
    function inittable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败');
                }
                // 使用模板引擎渲染页面数据
                var htmlstr = template('tpl-table', res);
                $('tbody').html(htmlstr);
            }
        });
    }
});