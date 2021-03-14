let input = document.getElementsByClassName('el-input');
let myName = document.getElementsByClassName('myName')[0];
let myMajor = document.getElementsByClassName('myMajor')[0];
let myClassNum = document.getElementsByClassName('myClassNum')[0];
let stuNum = document.getElementsByClassName('stuID-input')[0];
let submit = document.getElementsByClassName('submit')[0];
let score = document.getElementsByClassName('score');
let errorText = '输入有误，请重新输入';
// 转换页面的变量声明
let next_way1 = document.getElementsByClassName('next_way')[0];
let previous_way1 = document.getElementsByClassName('step2-pre')[0];
let next_way2 = document.getElementsByClassName('step2-next')[0];
let previous_way2 = document.getElementsByClassName('previous_way')[0];
let step1 = document.getElementsByClassName('step1')[0];
let step2 = document.getElementsByClassName('step2')[0];
let step3 = document.getElementsByClassName('step3')[0];
judge();
exchangePage();

function judge() {
    judgeMyName();
    judgeStuNum();
    judgeScore();
    judgeSubmit();
}

// 转换页面部分 start
function exchangePage() {
    next_page();
    pre_page();
}

function next_page() {
    next_way1.addEventListener('click', function() {
        step1.style.display = 'none';
        step2.style.display = 'block';
        step3.style.display = 'none';
    })
    next_way2.addEventListener('click', function() {
        step1.style.display = 'none';
        step2.style.display = 'none';
        step3.style.display = 'block';
    })
}

function pre_page() {
    previous_way1.addEventListener('click', function() {
        step1.style.display = 'block';
        step2.style.display = 'none';
        step3.style.display = 'none';
    })
    previous_way2.addEventListener('click', function() {
        step1.style.display = 'none';
        step2.style.display = 'block';
        step3.style.display = 'none';
    })
}

// 转换页面部分 end

// 判断输入是否正确部分 start
// 判定姓名、专业和班级部分
function judgeMyName() {
    let thisMyNum = /[^\u4e00-\u9fa5]/;
    myName.addEventListener('blur', function() {
        if (this.value == '') {
            this.nextElementSibling.innerHTML = '请告诉我们你的名字吧';
            this.nextElementSibling.className = 'error';
        } else if (thisMyNum.test(this.value)) {
            this.nextElementSibling.innerHTML = '姓名只能是汉字哦';
            this.nextElementSibling.className = 'error';
        } else {
            this.nextElementSibling.innerHTML = '';
            this.nextElementSibling.className = '';
        }
    }, false);
    myMajor.addEventListener('blur', function() {
        if (this.value == '') {
            this.nextElementSibling.innerHTML = '请告诉我们你的专业吧';
            this.nextElementSibling.className = 'error';
        } else if (thisMyNum.test(this.value)) {
            this.nextElementSibling.innerHTML = '姓名只能是汉字哦';
            this.nextElementSibling.className = 'error';
        } else {
            this.nextElementSibling.innerHTML = '';
            this.nextElementSibling.className = '';
        }
    }, false);
}
// 判断学号和班级
function judgeStuNum() {
    let thisNum = /[^\d]/;
    stuNum.addEventListener('blur', function() {
        if (this.value == '') {
            this.nextElementSibling.innerHTML = '请告诉我们你的学号吧';
            this.nextElementSibling.className = 'error';
        } else if (thisNum.test(this.value) || this.value.length !== 11) {
            this.nextElementSibling.innerHTML = '学号只能是11位数字哦';
            this.nextElementSibling.className = 'error';
        } else {
            this.nextElementSibling.innerHTML = '';
            this.nextElementSibling.className = '';
        }
    }, false);
    myClassNum.addEventListener('blur', function() {
        if (this.value == '') {
            this.nextElementSibling.innerHTML = '请告诉我们你的班级吧';
            this.nextElementSibling.className = 'error';
        } else if (thisNum.test(this.value)) {
            this.nextElementSibling.innerHTML = '班级只能是一位或者两位数字哦';
            this.nextElementSibling.className = 'error';
        } else {
            this.nextElementSibling.innerHTML = '';
            this.nextElementSibling.className = '';
        }
    }, false);
}
// 判断成绩

function judgeScore() {
    let len = score.length;
    for (let i = 0; i < len; i++) {
        score[i].addEventListener('blur', function() {
            let thisScore = /^[1-9][0-9]?[0-9.]?[0-9]?/;
            if (this.value == '') {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '请输入你的成绩';
            } else if (!thisScore.test(this.value) || this.value > 100) {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = errorText;
            } else {
                this.nextElementSibling.className = '';
                this.nextElementSibling.innerHTML = '';
            }
        }, false);
    }
}

// 判断输入是否正确部分 end

function judgeSubmit() {
    submit.addEventListener('click', function() {
        if (submitClick()) {
            //提交处理
            let data = {
                stuId: input[1].value,
                stuName: input[0].value,
                major:input[2].value,
                className:input[3].value,
                englishOne: +input[4].value,
                englishTwo: +input[7].value,
                mathematicsOne: +input[5].value,
                mathematicsTwo: +input[8].value,
                cProgram: +input[6].value,
                javaProgram: +input[9].value
            }
            let xhr = new XMLHttpRequest()
            xhr.open('POST', 'http://139.155.249.105:9000/signup')
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify(data))
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        window.alert("提交成功,点击确认后返回主页")
                            window.location.assign('../../Home.html')
                    } else {
                        alert("学号重复，提交失败")
                    }
                }
            }
        } else {
            isWriteAll();
        }

    }, false)
}

function submitClick() {
    for (let i = 0; i < input.length; i++) {
        if (input[i].nextElementSibling.className == 'error' || input[i].value == '') {
            return false;
        }
    }
    return true;
}

function isWriteAll() {
    let temp = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i].nextElementSibling.className == 'error' || input[i].value == '') {
            if (temp < 2) {
                step1.style.display = 'block';
                step2.style.display = 'none';
                step3.style.display = 'none';
            } else if (temp < 4) {
                step1.style.display = 'none';
                step2.style.display = 'block';
                step3.style.display = 'none';
            }
            for (let j = 0; j < input.length; j++) {
                if (input[i].nextElementSibling.className == 'error' || input[i].value == '') {
                    input[i].focus();
                    input[i].blur();
                    input[i].focus();
                    return;
                }
            }
        } else {
            temp++;
        }
    }
}