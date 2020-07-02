let baseUrl = "http://localhost/kaola.com";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];

            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    let pic = JSON.parse(res.pic);

                    let temp = `
                        <div class="showImgBox">
                            <img src="${baseUrl}/src/${pic[1].src}">
                            <b class="shadow" style="top: 0px; left: 177.5px; display: none;"></b>
                        </div>
                        <dl class="PInfo">           
                            <dt class="pro-title">           
                            <span>${res.title}</span>
                            </dt>
                            <dt class="subTit">${res.detail}</dt>
                            <dd class="price-wrap">                
                                <div class="m-price">
                                    <span class="m-line-title m-price-title j-price-title">售价</span>
                                    <div class="m-price-cnt">
                                        <span class="PInfo_rcurrentPrice">¥
                                            <span class="pri">${res.price}</span>
                                            <span class="curpricetxt">起</span>
                                        </span>
                                    </div>
                                </div>
                            </dd>
                            <div class="m-buyBox">
                                <span class="m-line-title">数量</span>
                                <input type="number" class="num" min="1" max="${res.num}" value="1">

                                <span class="m-line-c">库存</span>
                                <span class="m-line-num">${res.num} &nbsp&nbsp&nbsp&nbsp件</span>
                            </div>
                            <dd>
                                <form id="j-formEl" method="post" action="">       
                                    <div class="clearfix">
                                        <span class="m-line-am-34">说明</span>
                                        <ul class="buynowonly-tip-lis">
                                            <li class="f-fl"><i class=""></i>正品保障</li>
                                            <li class="f-fl"><i class="unsupport"></i>不支持7天无理由退货</li>
                                            <li class="f-fl"><i class="unsupport"></i>不可使用优惠券</li>
                                        </ul>
                                    </div>
                                    <div class="buyBtns">
                                        <a href="javascript:void(0)" hidefocus="true" class="j-buynow-btn" id="buyBtn">立即购买</a>
                                        <a hidefocus="true" class="j-add2cart-btn" id="addCart" href="${baseUrl}/src/html/shopcar.html?id=${res.id}"><span class="icon-cart20"></span>加入购物车</a>
                                    </div>
                                </form>
                            </dd>
                        </dl>
                    `;

                    $('.detail-inf').append(temp);

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            // shop
            let shop = cookie.get('shop'); // 获取cookie中的购物车 
            // 获取是为了判断它是否存在
            // 不存在 创建
            // 存在 修改
            
            let product = {
                id: id,
                price: price,
                num: num
            }

            if (shop) { // 存在
                shop = JSON.parse(shop); // 将字符串转成数组
                // 数组中已经存在了商品的id
                // 只修改num只 而不是将商品放入数组
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = []; // 不存在新建数组
                shop.push(product); // 放入商品
            }

            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }
});