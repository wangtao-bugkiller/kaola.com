require.config({
    paths: {
        jquery: './jquery.min',
        shopcar: './lib/shopcar',
        cookie: './cookie'
    }
});

require(['shopcar'], function(shopcar) {
    shopcar.render();
})
