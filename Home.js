//顶部隐藏菜单
var dec = document.getElementsByClassName('dec'),
    menu = document.getElementsByClassName('menu-wrap');
    first = 0,
    second = 0;

function showList(dec) {
    dec.className = 'dec currentOn';
    dec.nextElementSibling.className = 'menu-wrap on';
    clearInterval(dec.timer);
    dec.timer = "";
}
function hide(dec) {
    first = new Date().getTime();
    dec.timer = setInterval(function () {
        second = new Date().getTime();
        if(second - first >= 200){
            dec.className = 'dec';
            dec.nextElementSibling.className = 'menu-wrap';
        }
    },10);
}
//自动添加事件
for (const element of dec) {
    if(element.nextElementSibling) {
        element.onmouseenter = ()=> {showList(element)};
        element.onmouseleave = ()=> {hide(element)};
        element.nextElementSibling.onmouseenter = ()=> {showList(element)};
        element.nextElementSibling.onmouseleave = ()=> {hide(element)};
    }
}

//图片滚动的动画
function animate(obj, target) {
    clearInterval(obj.timer);
    step = obj.offsetLeft > target ? -7 : 7;
    obj.timer = setInterval(function() {
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
        }else{
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 1);
}
//轮播图
var ggc = document.getElementsByClassName('ggc')[0],
    slider = document.getElementsByClassName('slider')[0],
    trigger = document.getElementsByClassName('trigger')[0],
    len = slider.children.length,
    ggcWidth = ggc.offsetWidth;
slider.addEventListener('mouseenter', function () {
    clearInterval(timer);
    timer = null;
});
slider.addEventListener('mouseleave', function () {
    timer = setInterval(function () {
        if(num == len) {
            slider.style.left = 0;
            num = 0;
        }
        num++;
        circle++;
        animate(slider, -num * ggcWidth);
        if(circle == len) {
            circle = 0;
        }
        for(var i = 0; i < len; i++){
            trigger.children[i].className = "";
        }
        trigger.children[circle].className = 'current';
    },5000);
});

for(var i = 0; i < slider.children.length; i++){
    var span = document.createElement('span');
    span.index = i;
    span.addEventListener('click', function () {
        for(var j = 0; j < len; j++){
            trigger.children[j].className = "";
        }
        this.className = 'current';
        num = this.index;
        circle = this.index;
        animate(slider, -this.index * ggcWidth);
    });
    trigger.appendChild(span);
}
trigger.children[0].className = 'current';
var clone = slider.children[0].cloneNode(true);
slider.appendChild(clone);
//自动播放
var num = 0,
    circle = 0,
    timer = setInterval(function () {
        if(num == len){//到最后一张复制的图片
            slider.style.left = 0;
            num = 0;
        }
        num++;
        circle++;
        animate(slider, -num * ggcWidth);
        if(circle == len) {
            circle = 0;
        }
        for(var i = 0; i < len; i++){
            trigger.children[i].className = "";
        }
        trigger.children[circle].className = 'current';
    }, 5000);