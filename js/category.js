window.addEventListener('load', function () {
    //   初始化分类左侧的滑动 限制了是初始化分类左侧的滑动效果  传人category-right里面的轮播图大容器选择器
    new Swiper('.category-left .swiper-container', {
        direction: 'vertical', // 垂直滚动
        // 可以支持多张轮播图显示 属性一定要加 内容滚动的距离如果不加无法计算
        slidesPerView: 'auto',
        freeMode: true, // 是否添加滑动的惯性

        // mousewheel: true,//支持鼠标滚轮
    });
    //   初始化分类左侧的滑动 限制了是初始化分类右侧的滑动效果  传人category-right里面的轮播图大容器选择器
    new Swiper('.category-right .swiper-container', {
        direction: 'vertical', // 垂直滚动
        // 可以支持多张轮播图显示 属性一定要加 内容滚动的距离如果不加无法计算
        slidesPerView: 'auto',
        freeMode: true, // 是否添加滑动的惯性
        scrollbar: {
            el: '.swiper-scrollbar',
        },

        // mousewheel: true,//支持鼠标滚轮
    });

    // 点击分类左侧的菜单实现吸顶效果
    /* 1. 点击了第一个菜单 位移0
        点击第二个菜单 位移1个a的高度
        点击第三个菜单 位移2个a的高度
        点击第几个菜单 位移当前菜单索引 * a 高度的高度位移 */

    // 1. 先获取所有li添加点击事件
    var lis = document.querySelectorAll('.category-left li');
    var liHeight = lis[0].offsetHeight;
    // 获取分类左侧的swiper-wrapper 真正滑动的元素
    var swiperWrapper = document.querySelector('.category-left .swiper-wrapper');
    // 计算最小的位移的距离  父容器高度 - 子容器的高度
    var parent = document.querySelector('.swiper-container');
    var children = document.querySelector('.swiper-slide');
    var minTranslateY = parent.offsetHeight - children.offsetHeight;
    console.log(minTranslateY);
    
    for (var i = 0; i < lis.length; i++) {
        //JS 对象添加属性
        // lis[i].index = i;
        //添加标签属性
        // lis[i].setAttribute('index',i);
        //HTML5的自定义data-属性 
        lis[i].dataset['index'] = i;
        lis[i].addEventListener('click', function () {
            // console.dir(this);
            // 获取JS对象的属性的值
            //   console.log(this.index);                  
            // 获取li标签属性的值
            //   console.log(this.getAttribute('index'));  
            // 获取HTML5的自定义data-属性                 
            // console.log(this.dataset['index']);
            // console.log(liHeight);
            // 因为是往上位移 值是负值
            var translateY = -(this.dataset['index'] * liHeight);
            console.log(translateY);
            // 在设置位移之前判断当前位移的距离 是否小于最小的位移距离
            if(translateY < minTranslateY){
                // 如果计算位移距离超过了最小位移距离 就设置为最小位移距离
                translateY = minTranslateY;
            }
            // 给swiperWrapper 设置位移
            swiperWrapper.style.transform = 'translate3d(0px,' + translateY + 'px,0px)';
            // 设置一个过渡效果 慢慢位移
            swiperWrapper.style.transition = 'all 0.2s';
            // 先删除所有人 active 给当前点击添加active
            for (var j = 0; j < lis.length; j++) {
                lis[j].classList.remove('active');
            }
            // 给当前li添加active
            this.classList.add('active');            
        });
    }
});