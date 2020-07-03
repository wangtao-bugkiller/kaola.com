let baseUrl = "http://localhost/kaola.com"; // 基础路径 必须是绝对路径

define(['jquery'], function($) {
    return {
        render: function() {

            //给边界导航条绑定事件
            $('body,html').on('scroll',function() {
                if($('body').scrollTop() >= 700) {
                    $('#l-aside').css('position', 'fixed').css('top', '65px');
                    $('#r-aside').css('position', 'fixed').css('top', '65px');
                } else {
                    $('#l-aside').css('position', 'absolute').css('top', '700px');
                    $('#r-aside').css('position', 'absolute').css('top', '700px');
                }

                if($('body').scrollTop() >= 140) {
                    $('#topsel').css('display', 'block')
                } else if($(window).scrollTop() < 140) {
                    $('#topsel').css('display', 'none')
                }
            });
            $('.toTop').on('click', function() {
                $('body').scrollTop(0);
            });

            //数据渲染
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    // console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        // console.log(elm.pic);
                        let pic = JSON.parse(elm.pic);
                        // console.log(pic);
                        temp += `<div>
                        <a class="pic" title="${elm.title}" href="${baseUrl}/src/html/ddetail.html?id=${elm.id}"><img src="${baseUrl}/src/${pic[0].src}" alt="${baseUrl}/src/${pic[0].title}"></a>
                        <div >
                            <h3><a class="protitle" href="${baseUrl}/src/html/ddetail.html?id=${elm.id}">${elm.title}</a></h3>
                            <p class="curprice" ><span class="symbol">¥</span><strong >${elm.price}</strong></p>
                        </div>
                    </div>`;
                    });

                    $('.hot-product').html(temp);

                }
            });
        }
    }
});

//------------轮播图-------------
var times = 0;
// 获取轮播图图片对象
const rotationImg = document.getElementsByClassName('RotationChart')[0].getElementsByTagName('img');
// 获取序列条小圆点对象
const bottomListLi = document.getElementsByClassName('bottomList')[0].getElementsByTagName('li');

// 初始值，第一次运行的时候第一张图片显示及底部序列条小圆点标记颜色显示
rotationImg[times].style.opacity = 1;
bottomListLi[times].style.backgroundColor = '#d22147';

function rotation() {
    // 设定计时器
    var roatationChart = setInterval(function () {
        // 当次数大于1次时，数组为1的图片（也就是第2张图片）透明度变为0，数组为0的图片透明度变为1
        if (times >= 1) {
            rotationImg[1].style.opacity = 0;
            rotationImg[0].style.opacity = 1;
            times = 0;
        }
        // 当次数小于1次时，以当前次数为下标的数组的图片透明度变为0，下一次为下标的数组的图片透明度变为1
        else if (times < 1) {
            rotationImg[times].style.opacity = 0;
            rotationImg[++times].style.opacity = 1;
        }
        for (let i = 0; i < bottomListLi.length; i++) {
            bottomListLi[i].style.backgroundColor = 'rgb(255, 255, 255)';
        }
        bottomListLi[times].style.backgroundColor = '#d22147';
    }, 2000)
}

rotation(); //定义函数后并不能启用，所以这里还要写这个函数名字来进行调用，才能运行


// 按钮操控轮播图
// 获取按钮对象
const RotationButtom = document.getElementsByClassName('RotationChart')[0].getElementsByTagName('span');

//底部序列条颜色改变函数，用于让所有序列小圆圈变白色，然后只指定当前次数所在的序列为暗红色
function bottomListLi_Change() {
    for (let i = 0; i < bottomListLi.length; i++) {
        bottomListLi[i].style.backgroundColor = 'rgb(255, 255, 255)';
    }
    bottomListLi[times].style.backgroundColor = '#d22147';
}

// RotationButtom[0]表示切换下一张图片
RotationButtom[0].onclick = function () {
    clearInterval(rotationImg);
    rotationImg[times].style.opacity = 0;
    times++;
    // 判断条件，当times递增后的值大于1次时，times归零，让图片从第一张图片开始切
    if (times > 1) {
        times = 0;
    }
    rotationImg[times].style.opacity = 1;
    bottomListLi_Change();
}
// RotationButtom[1]表示切换上一张图片
RotationButtom[1].onclick = function () {
    clearInterval(rotationImg);
    rotationImg[times].style.opacity = 0;
    times--;
    // 判断条件，当times递减后的值小于0次时，times跳到第2次切图,意思就是从第一张跳到最后一张
    if (times < 0) {
        times = 1;
    }
    rotationImg[times].style.opacity = 1;
    bottomListLi_Change();
}

//点击相应的序列条小圆圈后切换到相应的图片
for (let i = 0; i < bottomListLi.length; i++) {
    bottomListLi[i].onclick = function () {
        console.log(i);
        for (let i = 0; i < bottomListLi.length; i++) {
            if (bottomListLi[i] === this) {
                times = i;
                bottomListLi_Change();
                for (let z = 0; z < rotationImg.length; z++) {
                    rotationImg[z].style.opacity = 0;
                }
                rotationImg[times].style.opacity = 1;
                
                if (times >= 1) {
                    times = 0;
                } else {
                    times++;
                }
            }
        }
    }
}


	

