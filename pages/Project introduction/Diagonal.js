var position = 0, //记录当前是第几张图片
    slide = document.getElementsByClassName('slide'),
    img = document.getElementsByClassName('slide__img'),
    len = slide.length;

//修改 可以用transform-origin 和 rotate3d 来修改
var imgwrap = document.getElementsByClassName('slide__img-wrap'),
    imgTitle = document.getElementsByClassName('slide__title-wrap');
for (var i = 0; i < img.length; i++) {
    img[i].position = i;
    imgwrap[i].position = i;

}

//箭头事件
var arrow = document.getElementsByClassName('arrow');
arrow[0].addEventListener('click', function() {
    img[position - 1 < 0 ? len - 1 : position - 1].click();
});
arrow[1].addEventListener('click', function() {
    img[position + 1 > len - 1 ? 0 : position + 1].click();
});

var deco = document.getElementsByClassName('slideshow__deco')[0],
    x = img[position].getBoundingClientRect().left, //计算左边位置的坐标
    y = img[position].getBoundingClientRect().top,
    flag = 0;
deco.className = "slideshow__deco";
for (var i = 0; i < len; i++) {
    img[i].position = i; //为每个图片编号
    // PC端图片的左右展开 
    img[i].addEventListener('mousemove', function() {
        if (img[this.position].getBoundingClientRect().left == x) {
            flag = 1;
        }
        if (flag) { //只有到中心时才能展开
            img[this.position].id = "hover";
        }
    });
    img[i].addEventListener('mouseleave', function() {
        flag = 0;
        img[this.position].id = "";
    });
    // 图片的点击效果
    img[i].addEventListener('click', function() {
        var t = position; //存储未切换时的号码 用于判断是切换到哪一张
        position = this.position;
        clearOpacity();
        randomChar(slideTitle, 15);
        randomChar(slideSide, 10);
        if (t == position) {

        } else if (position - t == 1 || t - position == len - 1) {
            deco.className = "slideshow__deco next";
        } else {
            deco.className = "slideshow__deco prev";
        }

        show();
        var timer = setTimeout(function() {
            deco.className = "slideshow__deco";
        }, 500);
    });
}

function show() { //修改需要展示的三张图片的类名 以及预选的两张图片
    clearName();
    slide[position].className = "slide current";
    slide[position - 1 < 0 ? len - 1 : position - 1].className = "slide visible1";
    slide[position + 1 > len - 1 ? 0 : position + 1].className = "slide visible2";

    slide[position - 2 < 0 ? position - 2 + len : position - 2].className = "slide prev";
    slide[position + 2 > len - 1 ? position + 2 - len : position + 2].className = "slide next";
}

function clearName() {
    for (var i = 0; i < len; i++) {
        slide[i].className = "slide";
    }
}

// 字母随机延时显示
var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    charsLength = chars.length;
var slideTitle = document.getElementsByClassName('slide__title'),
    slideSide = document.getElementsByClassName('slide__side'),
    words = [];
toSpan(slideTitle, words);
toSpan(slideSide, words);

//把target里的每个单词的每个字符用span代替
function toSpan(target, words) {
    for (var i = 0; i < target.length; i++) {
        words[i] = target[i].innerText;
    }
    for (var i = 0; i < target.length; i++) {
        target[i].innerHTML = "";
        for (var j = 0; j < words[i].length; j++) {
            var span = document.createElement('span');
            span.style.opacity = "0";
            span.className = "char" + (j + 1);
            span.innerHTML = words[i][j];
            target[i].appendChild(span);
        }
    }
}

//采坑， 闭包问题
var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function allShow(target) { //是否所有字母都显示出来了
    for (var i = 0; i < target.children.length; i++) {
        if (target.children[i].style.opacity == "0") {
            return false;
        }
    }
    return true;
}

function clearOpacity() {
    var prev = position - 1 < 0 ? len - 1 : position - 1, //清除上一张和下一张的文本opacity
        next = position + 1 > len - 1 ? 0 : position + 1;

    for (var i = 0; i < slideTitle[prev].children.length; i++) {
        slideTitle[prev].children[i].style.opacity = "0";
    }
    for (var i = 0; i < slideSide[prev].children.length; i++) {
        slideSide[prev].children[i].style.opacity = "0";
    }
    for (var i = 0; i < slideTitle[next].children.length; i++) {
        slideTitle[next].children[i].style.opacity = "0";
    }
    for (var i = 0; i < slideSide[next].children.length; i++) {
        slideSide[next].children[i].style.opacity = "0";
    }

}

//随机时间显示字母
function randomChar(target, time) {
    var timer,
        num = 0;
    var display = function() {
        timer = setTimeout(function() {
            target[position].children.length;
            if (target[position].children[getRandomInt(0, target[position].children.length - 1)] != undefined) {
                target[position].children[getRandomInt(0, target[position].children.length - 1)].style.opacity = '1';
            }
            if (allShow(target[position])) {
                clearTimeout(timer);
            } else {
                display();
            }
        }, time);
        num++;
    }
    display();
}
randomChar(slideTitle, 15);
randomChar(slideSide, 10);
show();


//介绍显示部分
var slideShow = document.getElementsByClassName('slideshow')[0],
    content = document.getElementsByClassName('content__item'),
    close = document.getElementsByClassName('content__close')[0],
    flag2 = false;

close.style.opacity = "0";
for (var i = 0; i < imgwrap.length; i++) {
    content[i].style.opacity = "0";
    imgwrap[i].addEventListener('click', function() {
        flag2 = false;
        if (this.getBoundingClientRect().left == x) {
            flag2 = true;
        }
        if (this.position == position && flag2) {
            imgwrap[position].style.transition = "all .7s cubic-bezier(1, -0.01, 0.77, 0.96)"; //图片平滑移动
            slideShow.className = "slideshow open"; //左右箭头移开
            deco.style.opacity = '1';
            deco.style.transform = "matrix(3.71014, 0, 0, 1.24913, -20, 20)"; //背景阴影扩大
            //左右图片移开
            slide[position].className = "slide current click";
            slide[position - 1 < 0 ? len - 1 : position - 1].className = "slide visible1 click";
            slide[position + 1 > len - 1 ? 0 : position + 1].className = "slide visible2 click";
            //内容显现
            content[position].children[1].style.bottom = "30px";
            content[position].children[2].style.bottom = "60px";
            var timer = setTimeout(function() {
                content[position].className = "content__item contentOn"
                content[position].style.opacity = "1";
                content[position].children[1].style.opacity = "1";
                content[position].children[1].style.bottom = "0px";
                content[position].children[2].style.opacity = "1";
                content[position].children[2].style.bottom = "0px";
                close.style.opacity = "1";
            }, 750);
        }
    });
}
close.addEventListener('click', function() {
    deco.style.transform = "transform: translate3d(0, 0, 0);";
    content[position].className = "content__item"
    slideShow.className = "slideshow";
    deco.style.opacity = '0';
    deco.style.transform = "";
    slide[position].className = "slide current";
    slide[position - 1 < 0 ? len - 1 : position - 1].className = "slide visible1";
    slide[position + 1 > len - 1 ? 0 : position + 1].className = "slide visible2";
    content[position].style.opacity = "0";
    content[position].children[1].style.opacity = "1";
    content[position].children[2].style.opacity = "1";
    close.style.opacity = "0";

    for (var i = 0; i < slideTitle[position].children.length; i++) {
        slideTitle[position].children[i].style.opacity = "0";
    }
    for (var i = 0; i < slideSide[position].children.length; i++) {
        slideSide[position].children[i].style.opacity = "0";
    }
    randomChar(slideTitle, 15);
    randomChar(slideSide, 10);
});