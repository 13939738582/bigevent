$(function() {
    initCate();
    // 加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('初始化文章分类失败');
                }
                // 调用模板引擎
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        });
    }
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function() {
        $('#coverfile').click();
    });

    $('#coverfile').on('change', function(e) {
        var files = e.target.files;
        if (files.length == 0) {
            return layui.layer.msg('没有选择文件');
        }
        var newImageURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImageURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 定义文章的发布状态
    var art_state = '已发布';
    $('#brnSave1').on('click', function() {
        art_state = '已发布';
    });
    $('#brnSave2').on('click', function() {
        art_state = '草稿';
    });
    // 为表单绑定提交事件
    $('#form_pub').on('submit', function(e) {
        e.preventDefault();
        // 基于表单创建一个formDate对象
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        // 将封面裁剪过后的图片输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，将文件对象存到fd中
                fd.append('cover_img', blob);
            });
        publishArticle(fd);

    });
    // 定义发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            // 如果向服务器提交的是formData格式的数据需要添加配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('发布文章失败');
                }
                layui.layer.msg('发布文章成功');
                location.href = '../article/art_list.html';
            }
        });
    }
});