
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

//选择项显示
var proName = document.getElementsByClassName('pro-name'),
    content = document.getElementsByClassName('content-right');//proName的个数比content少1
    target = document.getElementsByClassName('target')[0],
    span = document.getElementsByClassName('none')[0];
for(var i = 0; i < proName.length; i++) {
    proName[i].index = i;
    proName[i].addEventListener('click', function () {
        span.className = "";
        target.innerText = proName[this.index].innerText;
        clearName();
        proName[this.index].className = "pro-name selected";
        content[this.index+1].className = "content-right on";
    });
}
function clearName() {
    for(var i = 0; i < proName.length; i++) {
        proName[i].className = "pro-name";
    }
    for(var i = 0; i < content.length; i++) {
        content[i].className = "content-right";
    }
}

//记录位置, 跳转页面不改变位置
scrollTo(0,localStorage.num);
window.onscroll = function () {
    if(localStorage.num) {
        localStorage.num = pageYOffset;
    } else {
        localStorage.num = 0;
    }
}
