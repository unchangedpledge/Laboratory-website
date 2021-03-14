//顶部隐藏菜单
var dec = document.getElementsByClassName('dec'),
    menu = document.getElementsByClassName('menu-wrap'),
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

//轮播图
var wrap = document.getElementsByClassName('wrap')[0],
    items = document.getElementsByClassName('item'),
    goPreBtn = document.getElementsByClassName('goPre')[0],
    goNextBtn = document.getElementsByClassName('goNext')[0],
    trigger = document.getElementsByClassName('trigger')[0],
    index = 0;
for (var i = 0; i < items.length; i++) {
    var li = document.createElement('li');
    li.className = 'point';
    li.index = i;
    li.addEventListener('click', function() {
        index = this.index;
        goIndex();
    });
    trigger.appendChild(li);
}
var points = trigger.children;
items[0].className = 'item current';
points[0].className = 'point current';
var goIndex = function() {
    for (var i = 0; i < items.length; i++) {
        items[i].className = "item";
        points[i].className = "point";
    }
    items[index].className = "item current";
    points[index].className = "point current";
}
var goNext = function() {
    if (index == items.length - 1) {
        index = 0;
    } else {
        index++;
    }
    goIndex();
}
var goPre = function() {
    if (index == 0) {
        index = items.length - 1;
    } else {
        index--;
    }
    goIndex();
}
goPreBtn.addEventListener('click', function() {
    goPre();
});
goNextBtn.addEventListener('click', function() {
    goNext();
});
var time = 0; //控制时长
var atuoPlay = function() {
    return setInterval(function() {
        if (time == 50) {
            goNext();
            time = 0;
        } else {
            time++;
        }
    }, 100);
}
var timerForSlider = atuoPlay();
wrap.addEventListener('mouseenter', function() {
    clearInterval(timerForSlider);
    timerForSlider = null;
});
wrap.addEventListener('mouseleave', function() {
    time = 0;
    timerForSlider = atuoPlay();
});

//回到顶部
var goTop = document.getElementsByClassName('goTop')[0],
    distance = 0,
    topTimer;
goTop.onclick = function() {
    distance = scrollY
    topTimer = setInterval(function() {
        distance -= 50;
        if (distance <= 0) {
            distance = 0;
        }
        scrollTo(0, distance);
        if (distance == 0) {
            clearInterval(topTimer);
        }
    }, 10);
}