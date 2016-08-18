var bgm = document.getElementById("bgm");
var wa;

jQuery(document).ready(function ($) {
   //添加横屏提示
    new WxMoment.OrientationTip();

    $(".wp").css("display","none");
    $(".main-title").css("display","none");
    initPage();
    loading();
    $("#getPrize").hide();
    $(".heart").hide();
    $("body").one("touchstart",function(){
        bgm.play();
        bgm.loop = true;
    });
    //---------------------------老虎机开始---------------------------------
    var done = false;
    loop = 0;
    function get_random() {
        return Math.floor(Math.random()*7)+1;
    }
    function get_fail_result() {
        result = [];
        result[0] = get_random();
        do {
            result[1] = get_random();
        } while (result[1] == result[0]);
        result[2] = get_random();
        return result;
    }
    var status = 0; // 0 stop 1 begin 2 loop 3 end
    $('#slotMachineButton1').on('click', function(event) {
        $(".againButton").css("display","none");
        $(".stopButton").css("display","block");
        event.preventDefault();
        loop++;
        $('.slot_window img').removeClass();
        if ((!done)&&(loop!=1)) {
            // $('.slot_window img').addClass('move_restart');
            $('#slot_window_1 img').addClass('move_restart_from_' + result[0]);
            $('#slot_window_2 img').addClass('move_restart_from_' + result[1]);
            $('#slot_window_3 img').addClass('move_restart_from_' + result[2]);

            $('#slot_window_1 img').one('webkitAnimationEnd', function(event) {
                /* Act on the event */
                console.log('yes');
                $('#slot_window_1 img').removeClass();
                $('#slot_window_1 img').addClass('move_begin');
                $('#slot_window_1 img').one("webkitAnimationEnd", move_begin_complete_1);
            });
            $('#slot_window_2 img').one('webkitAnimationEnd', function(event) {
                /* Act on the event */
                $('#slot_window_2 img').removeClass();
                $('#slot_window_2 img').addClass('move_begin');
                $('#slot_window_2 img').one("webkitAnimationEnd", move_begin_complete_2);
            });
            $('#slot_window_3 img').one('webkitAnimationEnd', function(event) {
                /* Act on the event */
                $('#slot_window_3 img').removeClass();
                $('#slot_window_3 img').addClass('move_begin');
                $('#slot_window_3 img').one("webkitAnimationEnd", move_begin_complete_3);
            });
            console.log(222);
        }
        if (status == 0 && loop == 1) { // stop to begin
            $('.slot_window img').addClass('move_begin');
            console.log(111);
            status = 1;
            $('.slot_window img').one("webkitAnimationEnd", move_begin_complete);

        } else if (status == 2) { // loop to end

        }
    });



    //-------------------------------延迟点击开始-----------------------------
   //封装延迟点击
 var delayClick= function stopClick(){
    $('#stop').on('click', function(event) {
        event.preventDefault();
        $("#stop").unbind("click");
        setTimeout(function(){
            //延迟点击
            delayClick();
            console.log("-------------点击等待3秒-------------");
        },3000);

        $('.slot_window img').one('animationiteration webkitAnimationIteration', function() {
            console.log('move_stable_animationiteration');
            $('.slot_window img').unbind("animationiteration webkitAnimationIteration");
            var a = Math.floor(Math.random()*10)+1;
            if (a == 1 || loop == 3) {
                var result_1 = 1;
                var result_2 = 1;
                var result_3 = 1;
                $("#againImg").hide();
                surprised();
            } else {
                var result = get_fail_result();
                var result_1 = result[0];
                var result_2 = result[1];
                var result_3 = result[2];
            }

            console.log(result_1 + ':' + result_2 + ':' + result_3);
            $('#slot_window_1 img').removeClass('move_stable').addClass('move_end_'+result_1);
            $('#slot_window_2 img').removeClass('move_stable').addClass('move_end_'+result_2);
            $('#slot_window_3 img').removeClass('move_stable').addClass('move_end_'+result_3);

            $('.slot_window img').one("webkitAnimationEnd", move_end_complete);
            status == 3;
        });
    });
}
     //延迟点击
    delayClick();

    //-------------------------------延迟点击结束-----------------------------

    function move_begin_complete_1() {
        $('#slot_window_1 img').unbind("webkitAnimationEnd");
        $('#slot_window_1 img').removeClass('move_begin').addClass('move_stable');
        status = 2;
    }

    function move_begin_complete_2() {
        $('#slot_window_2 img').unbind("webkitAnimationEnd");
        $('#slot_window_2 img').removeClass('move_begin').addClass('move_stable');
        status = 2;
    }

    function move_begin_complete_3() {
        $('#slot_window_3 img').unbind("webkitAnimationEnd");
        $('#slot_window_3 img').removeClass('move_begin').addClass('move_stable');
        status = 2;
    }
    function move_begin_complete() {
        console.log('move_begin_complete');
        $('.slot_window img').unbind("webkitAnimationEnd");
        $('.slot_window img').removeClass('move_begin').addClass('move_stable');
        status = 2;
    }
    function move_end_complete() {
        console.log('move_end_complete');
        $('.slot_window img').unbind("webkitAnimationEnd");
        status = 0;
        $(".stopButton").css("display","none");
        $(".againButton").css("display","block");


    }
    $('#slotMachineButton1').trigger('click');
    //---------------------------老虎机结束---------------------------------
});

/* 安卓输入法会顶上去的原因 */
function initPage() {
    if (browser.versions.android) {
        $('.wp').css({height: $(window).height()});
        $('.submitFrom').css({height: $(window).height()});
        $('.screenshot').css({height: $(window).height()});
    }

}
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
        };
    }()
}
if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
}

//关闭音乐
$('.main-title').click(function () {
    if($(this).hasClass('on')) {
        bgm.pause();
        $(this).removeClass('on');
        $(this).css("background-image","url(../img/off.png)");
    }else{
        bgm.play();
        $(this).addClass('on');
        $(this).css("background-image","url(../img/on.png)");
    }
});
//抽中奖品
function surprised(){

    $(".heart").fadeIn().show();

    $(".heartImg").addClass("pulse");
    setTimeout(function(){
        $(".wp").css("display","none");

    },2800);
    setTimeout(function(){
        $(".heartImg").css("display","none");
    },3800);
}

//领取柜台
$("select#city").change(function () {
    var  city = $("select option:selected").text();
    $("#txtCity").val(city)
});

//提交
$(".submitTo").click(function(){
    var txtName =$("#txtName").val();//姓名
    var txtPhone =$("#txtPhone").val();//手机
    var txtCity =$("#txtCity").val();//柜台
    var cityValue=$("#city").find("option:selected").val();
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(txtName==""){
        warning("请输入姓名");
    }else if(txtPhone==""){
        warning("请输入手机号码");
    }else if (!myreg.test(txtPhone)) {
        warning("请输入正确的手机号码");
    }else if(txtCity=="" ||cityValue==0){
        warning("请选择领取柜台");
    }else{
        console.log(txtName);
        console.log(txtPhone);
        console.log(txtCity);
        //填写表单内容
        //var form = new WxMoment.Form({
        //    appid: 'wx12b4c5f1477b4889',      //客户公众号appid，可在 微信公众平台->开发者中心 查看
        //    qid: '12042',                    //表单id，请与运营经理联系获取
        //    name: txtName,                  //表单内容，需先与运营经理沟通后配置所需提交的内容
        //    tel: txtPhone,
        //    sex: "lady",
        //    store: txtCity
        //})
       //提交表单
        $(".delayLoading").css("display","");
        //form.submit(function () {
            //成功的回调
            //-----------------------提交开始-------------------
            //$(".delayLoading").css("display","");
            $.ajax( {
                url:'https://sms.6edigital.cn/send.php',// 跳转到 action
                data:{
                    username:txtName,    //姓名
                    mobile : txtPhone,  //手机
                    store:txtCity      //柜台
                },
                type:'post',
                dataType:'json',
                success:function(data) {
                    console.log(data);
                    if(data.code==2){
                        $(".delayLoading").css("display","none");
                        $(".submitFrom").fadeOut().hide();
                        $(".screenshot").fadeIn().show();
                    }else if(data.code==3){
                        warning("请求参数错误");
                        $(".delayLoading").css("display","none");
                    }else if(data.code==4){
                        warning(" 请求参数格式错误");
                        $(".delayLoading").css("display","none");
                    }else if(data.code==5){
                        warning("手机号码已存在");
                        $(".delayLoading").css("display","none");
                    }else if(data.code==6){
                        warning("提交失败");
                        $(".delayLoading").css("display","none");
                    }
                },
                error : function() {
                    warning("请求失败");
                    $(".delayLoading").css("display","none");
                }
            });
            //-----------------------提交结束-------------------

        //}, function () {
        //    //失败的回调
        //    $(".delayLoading").css("display","none");
        //    warning("提交信息失败");
        //})
    }
});



//提示弹出框
function warning(txt){
    $(document).confirm(txt,{},function(){
    });
}


//加载页面
function loading() {

    //正式环境地址
    var basePath = "https://wximg.qq.com/wxp/moment/4JjpcMxw-/";
    var loader = new WxMoment.Loader();
     //声明资源文件列表
    var fileList = [
        'img/again.png',
        "img/again.png",
        "img/bg1.jpg",
        "img/bg2.jpg",
        "img/bg3.jpg",
        "img/heart.png",
        "img/loading.png",
        "img/off.png",
        "img/on.png",
        "img/refer.png",
        "img/stop.png",
        "img/t1.png",
        "img/t2.png",
        "img/t3.png",
        "img/t4.png",
        "img/t5.png",
        "img/t6.png",
        "img/t7.png"
    ];
    for (var i = 0; i < fileList.length; i++) {
        loader.addImage(basePath + fileList[i]);
    }
//进度监听
    loader.addProgressListener(function (e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        //console.log("当前加载了", percent, "%");
        //在这里做 Loading 页面中百分比的显示
        $('.number').html(percent + "%");
    });

//加载完成
    loader.addCompletionListener(function () {
        //可以在这里隐藏 Loading 页面开始进入主内容页面
        console.log("加载完成了！！！！");
        $(".loading").css("display","none");
        $(".wp").css("display","block");
        $('.main-title').fadeIn().addClass('on');
    });
//启动加载
    loader.start();
}


//弹出层
(function($){
    //ios confirm box
    jQuery.fn.confirm = function(title,option,okCall,cancelCall){
        var defaults = {
            title: null, //what text
//			cancelText: '取消', //the cancel btn text
            okText: '确定' //the ok btn text
        };
        if( undefined === option )
        {
            option = {};
        }
        if( 'function' != typeof okCall )
        {
            okCall = $.noop;
        }
        if( 'function' != typeof cancelCall )
        {
            cancelCall = $.noop;
        }
        var o = $.extend(defaults, option , {title:title,okCall:okCall,cancelCall:cancelCall});
        var $dom = $(this);
        var dom = $('<div class="g-plugin-confirm">');
        var dom1 = $('<div>').appendTo(dom);
        var dom_content = $('<div>').html(o.title).appendTo(dom1);
        var dom_btn = $('<div>').appendTo(dom1);
        var btn_ok = $('<a href="#"></a>').html(o.okText).appendTo(dom_btn);
        btn_ok.on('click' , function(e){
            o.okCall();
            dom.remove();
            e.preventDefault();
        });

        dom.appendTo($('body'));
        return $dom;
    };
})(jQuery);













