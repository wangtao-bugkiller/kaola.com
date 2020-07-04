let baseUrl = "http://localhost/kaola.com";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function() {
            let shop = cookie.get('shop');
             //   获取cookie数据

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
                                    <p class="limitmsg">剩余${elm.num}件</p>
                                </div>
                                <div class="skudesc"  >
                                    <p title="颜色" class="skuline"  >颜色：${elm.color}</p>
                                </div>
                            </div>
                            <div class="col col3"  >
                                <div class="newprice "  >
                                    <span>￥<span class="finapp">${elm.price}</span></span>
                                </div>
                            </div>
                            <div class="col col4"  >
                                <span class="minus algorithm">-</span>
								<input type="text" class="num" value="${arr[0].num}" min="1" max="${elm.num}" />
								<span class="plus algorithm">+</span>
                            </div>
                            <div class="col col5"  >
                                <span class="sum sumrow"  >￥${(arr[0].num*elm.price).toFixed(2)}</span>
                            </div>
                            <div class="col col6"  >
                                <a class="u-opt shop-del">删除</a>
                                <span class="u-opt"  >移入我的收藏</span>
                            </div>
                            <div id="del-id" style="display:none">${elm.id}</div>
                        </li>`
                            ;
                            // <input type="number" class="num" min="1" max="${elm.num}" value="${arr[0].num}"></input>

                        });
                        $('.m-goods').append(tempstr);
                        $('.totalnum').html(`￥${numT.toFixed(2)}`);
                        $('.num').html(`￥${numT.toFixed(2)}`);
                        $('.itm1').html(`￥${numT.toFixed(2)}`);
                        $('.num1').html(`${numitem}`);


                        $('.shop-del').on('click',function(){
                            let d = ($("#del-id").text());
                            shop1=shop.filter(val => val.id!=d);
                            cookie.set('shop',JSON.stringify(shop1),1);
                            location.reload();
                        });


                        $('.gobuy').on('click',function(){
                            cookie.set('shop',' ',-1);
                            alert('您的订单已提交');
                            location.reload();
                        });
                    }
                });
            }
            $('.check-all').on('click',function(){
                $('input[type=checkbox]').prop('checked',$(this).prop('checked'))
            })

            $('.m-goods').on('click', '.plus', function() {
                var val = $(this).prev().val();
                val++;
                $(this).prev().val(val);
                var totalprice=(($(this).parent().prev().children().children().children('.finapp').text()*1)*val);
                $(this).parent().next().children().text(totalprice);
                $('.totalnum').html(`￥${totalprice.toFixed(2)}`);
                $('.num').html(`￥${totalprice.toFixed(2)}`);
                $('.itm1').html(`￥${totalprice.toFixed(2)}`);


                shop=cookie.get('shop');
                shop2 = JSON.parse(shop);
                let d = ($(this).parent().next().next().next().text());
                let p = ($(this).parent())
                shop3=shop2.filter(val => val.id!=d);
                shop3.push({id: d, price: `${$(this).parent().prev().children().children().children('.finapp').text()*1}`, num: `${val}`});
                cookie.set('shop',JSON.stringify(shop3),1);
                location.reload;
            });
            $('.m-goods').on('click', '.minus', function() {
                var val = $(this).next().val();
                val--;
                if(val <= 0) {
                    val = 1;
                }
                $(this).next().val(val);
                var totalprice=(($(this).parent().prev().children().children().children('.finapp').text()*1)*val);
                $(this).parent().next().children().text(totalprice);
                $('.totalnum').html(`￥${totalprice.toFixed(2)}`);
                $('.num').html(`￥${totalprice.toFixed(2)}`);
                $('.itm1').html(`￥${totalprice.toFixed(2)}`);

                shop=cookie.get('shop');
                shop2 = JSON.parse(shop);
                let d = ($(this).parent().next().next().next().text());
                let p = ($(this).parent())
                shop3=shop2.filter(val => val.id!=d);
                shop3.push({id: d, price: `${$(this).parent().prev().children().children().children('.finapp').text()*1}`, num: `${val}`});
                cookie.set('shop',JSON.stringify(shop3),1);
                
                location.reload;
            })
        }
    }
});