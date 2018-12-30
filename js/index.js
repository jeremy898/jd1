// window.addEventListener('load', function () {},false)
// window.addEventListener('load', function () {},true)
// false 禁止捕获就是冒泡方式
// true 开启捕获 使用捕获方式

/* 推荐使用addEventlistener的方式添加事件  移动端兼容好 可以大胆使用

1. 这个方式可以添加多个同类型的事件
2. 控制事件的触发顺序 冒泡 还是 捕获
3. 添加一些新的事件 移动端新的触摸事件 CSS一些动画事件 等等 */

// 添加一个load事件 等页面资源加载完毕触发
window.addEventListener('load', function () {
    // 获取元素 querySelector querySelectorAll 在移动端推荐使用这个方式
    /* 1. 顶部搜索框背景色透明度渐变
        1. 在滚动的时候获取滚动的距离
        2. 获取轮播图的高度
        3. 计算透明度值  = 滚动距离 / 轮播图的高度
        4. 设置给透明背景色 rgba(红,绿,蓝,透明度值); */

    // 1. 获取轮播图的元素
    var slide = document.querySelector('#slide');
    // 2. 获取轮播图的高度
    var slideHeight = slide.offsetHeight;
    // 3. 获取头部元素
    var header = document.querySelector('#header');
    // 8. 把计算透明度代码封装到函数里面页面一加载就调用一下 然后在事件里面也不断的调用
    setHeaderOpacity();

    function setHeaderOpacity() {
        // 5. 获取当前滚动的距离 做一个兼容性处理 短路运算符 前面成立返回前面的不成立返回后面的
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop);
        // 6. 计算透明度值
        var opacity = scrollTop / slideHeight;
        // console.log(opacity);
        // 7. 把透明度设置给头部的rgba的a上
        header.style.backgroundColor = 'rgba(222, 24, 27, ' + opacity + ')';
    }
    // 4. 添加一个滚动条滚动的事件 指定当前设置透明透明度的函数 传的是函数体
    window.addEventListener('scroll', setHeaderOpacity);

    /* 倒计时JS效果
        1. 得先拿到一个总的时间(请求服务器的总剩余倒计时时间)
        2. 在前端对时间进行每隔1秒总秒数  -- 
        3. 把减完后的时间  时分秒 计算出来显示到页面上
        4. 分别显示 十位和个位 */
    // 获取所有倒计时的span标签
    var spans = document.querySelectorAll('.down-time span:not(:nth-child(3n))');
    // console.log(spans);

    // 1. 第一步获取后台返回的倒计时时间 暂时写死 假设 2小时
    var time = 2 * 60 * 60; // 时间进行-- 转出一个秒数
    // 8. 为了让页面加载马上显示倒计时 一开始调用计算时分秒和设置函数代码
    setDownTime();
    // 定义一个设置倒计时时分秒的函数
    function setDownTime() {
        if (time <= 0) {
            // 9. 如果时间小于0 重新开始一个新的倒计时
            time = 7200;
        }
        // 5. 计算--完后的时分秒 显示到页面上 总时间 / 60 / 60  总秒数/3600
        var hour = Math.floor(time / 60 / 60);
        // console.log(hour);
        // 6. 分钟 先去掉小时部分 求分钟  10000 % 3600 == 2800  1分钟 60  有多少个60秒 多少分钟 
        var minute = Math.floor(time % 3600 / 60);
        // console.log(minute);
        // 7. 秒数 只要除不尽60都是剩下的秒数 总时间 % 60  3620 % 3600 == 20 % 60 == 20  3620 % 60 == 20
        var second = time % 3600 % 60;
        // console.log(second);
        // 设置小时的十位 数字/ 10   20/10 == 2  10 / 10 == 1  5/10 == 0
        spans[0].innerHTML = Math.floor(hour / 10);
        // 设置小时的个位 数字 % 10  21 % 10 == 1
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[2].innerHTML = Math.floor(minute / 10);
        spans[3].innerHTML = Math.floor(minute % 10);
        spans[4].innerHTML = Math.floor(second / 10);
        spans[5].innerHTML = Math.floor(second % 10);
    }
    // 2. 设置一个定时器 每隔1秒--
    setInterval(function () {
        // 3. 让time总时间--
        time--;
        // 4. 减完后再设置倒计时的时分秒
        setDownTime();
    }, 1000);


    // 4. 初始化swiper插件
    new Swiper('.swiper-container', {
        loop: true,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        // 自动轮播图初始化
        autoplay: {
            delay: 10000,
            // 是否当你触摸滑动后禁止自动轮播图 
            disableOnInteraction: false, //不禁止
            // disableOnInteraction: true,// 禁止
        },
    });
});