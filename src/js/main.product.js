require.config({
    paths: {
        jquery: './jquery.min',
        product: './lib/product',
        cookie: './cookie'
    },
    shim: {}
});

require(['jquery', 'product'], function($, product) {
    // 回调函数 解决代码执行顺序问题
    // 当页面渲染完成才能获取元素
    product.render(function(id, price) {
        $('.j-add2cart-btn').on('click', function() {
            // console.log(1)
            product.addItem(id, price, $('.num').val());
        })
    });
});