let baseUrl = "http://localhost/kaola.com";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get('shop'); //   获取cookie数据

            if (shop) {
                shop = JSON.parse(shop);
                let idlist = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        // console.log(res);
                        let tempstr = '',
                            numitem=0,
                            numT=0;
                        res.forEach(elm => {
                            let pic = JSON.parse(elm.pic);

                            // cookie中获取 于当前从数据库中遍历出的相同元素
                            let arr = shop.filter(val => val.id == elm.id);
                                numT+=arr[0].num*elm.price;
                                numitem+=arr[0].num*1;
                            tempstr +=`<li data-err="0" class="gooditm"  >
                            <div class="col col0"  >
                            <input type="checkbox" name="selectGood" class="u-chk" checked="checked"  >
                            </div>
                            <div class="col col2"  >
                                <a class="imgwrap" target="_blank" href=""  >
                                <img src="${baseUrl}/src/${pic[0].src}"  >
                                </a>
                                <div class="txtwrap"  >
                                    <h3 class="goodtlt"  >
                                        <a title="${elm.title}" target="_blank" href=""  >${elm.title}
                                        </a>
                                    </h3>
                                    <p title="支持30天无忧退货" class="returninfo f-toe"  >
                                        <span class=""  >支持30天无忧退货</span>
                                    </p>
                                </div>
                                <div class="skudesc"  >
                                    <p title="颜色" class="skuline"  >颜色：粉色</p>
                                </div>
                            </div>
                            <div class="col col3"  >
                                <div class="newprice "  >
                                    <span  >￥${elm.price}</span>
                                </div>
                            </div>
                            <div class="col col4"  >
                                <input type="number" class="num" min="1" max="${elm.num}" value="${arr[0].num}">
                                <p class="limitmsg"  ></p>
                            </div>
                            <div class="col col5"  >
                                <span class="sum sumrow"  >￥${(arr[0].num*elm.price).toFixed(2)}</span>
                            </div>
                            <div class="col col6"  >
                                <a class="u-opt" id="shop-del" >删除</a>
                                <span class="u-opt"  >移入我的收藏</span>
                            </div>
                        </li>`
                            ;

                        });
                        $('.m-goods').append(tempstr);
                        $('.totalnum').html(`￥${numT.toFixed(2)}`);
                        $('.num').html(`￥${numT.toFixed(2)}`);
                        $('.itm1').html(`￥${numT.toFixed(2)}`);
                        $('.num1').html(`${numitem}`);
                        $('#shop-del').on('click',function(){
                            let i=$("this:parent");
                            console.log(i);
                            //cookie.set('shop', JSON.stringify(res), 1);
                            // cookie.remove('{"id":"${elm.id}","price":"${elm.price}","num":"${arr[0].num}"}');
                            location.reload();
                        });
                    }
                });
            }
        }
    }
});