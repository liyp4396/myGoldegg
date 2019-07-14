
// $(function() {
//     init();
// });
var init = (function () { 
    //获取 毫秒
    function getMs() {
        var countdowntime = document.querySelector('.count-downtime');

        var curTime = new Date();//当前时间
        var endTime = new Date("2019/8/8,21:30:00");//目标时间
        var countTime = endTime.getTime() - curTime.getTime();
        // console.log(countTime);
        // if(typeof countTime != 'number' || countTime < 0) {} 判断毫秒是否为数字
        countTime = + countTime;//转换数字类型
        if(countTime < 0){
            countdowntime.innerHTML = "活动已结束"
            return null;
        }
        //处理时间
        // var day = parseInt(countTime / (1000 * 60 * 60 * 24));
        var hours = parseInt(countTime / (1000 * 60 * 60)) % 24;
        var minutues = parseInt(countTime / (1000 * 60)) % 60;
        var seconds = parseInt(countTime / 1000) % 60;

        var hourStr = ('0' + hours);
        hourStr = hourStr.slice(-2);
        var minutueStr = ('0' + minutues);
        minutueStr = minutueStr.slice(-2);
        var secondStr = ('0' + seconds);
        secondStr = secondStr.slice(-2);

        var str = hourStr + ":" + minutueStr + ":" + secondStr;
        countdowntime.innerHTML = str;
    }
    //更新时间
    function upDateMs() {
        setInterval(function() {
            getMs();
        }, 1000)
    }

    //播放音乐
    function Music() {
        var myAudio = document.querySelector(".audio");
        myAudio.volume = 0.1;//音量
        var num = 0;
        var arrMusic = ['bgm1.mp3', 'bgm.mp3', 'bgm2.mp3'];
        var totalDuration, newCurrentTime;
        
        function countTime() {
            setInterval(function() {
                totalDuration = parseInt(myAudio.duration);
                newCurrentTime = parseInt(myAudio.currentTime);
                if( totalDuration == newCurrentTime) {
                    num ++;
                    if(num > arrMusic.length) {
                        num = 0;
                    }
                    myAudio.src = arrMusic[num];
                }
            }, 1000)
        }
        countTime();
        myAudio.src = arrMusic[num];
        //点击音乐暂停
        $('.stop-music').on('click', function() {
            $('.golden-header i').hide();
            $('.play-music').css('display', 'block');
           myAudio.pause();
        })
       //点击音乐播放
        $('.play-music').on('click', function() {
            $('.golden-header i').show();
            $('.play-music').css('display', 'none');
            myAudio.play();
        })
    };
    //砸金蛋
    function breakEggs() {
        // var $goldengegg = $('.golden-gegg');
        var $geggImg = $('.golden-gegg img');
        var $hammer = $('.hammer');
        var $eggbgm = $('.eggbgm');
        var $gasImg = $('.gas img')
        var $gas = $('.gas');
        var num = 0;
       
            $geggImg.each(function(index, element) {
            $geggImg.eq(index).click(function() {
                if(index <= 1){
                    if(num > 0)return;//是否砸过蛋
                    num ++;
                    $gas.css('left', 190 + 200 * index + 'px');
                    $gas.show();//显示图片
                    $hammer.css('left', 190 + 200 * index + 'px');
                    setTimeout(function() {
                        $hammer.addClass('hammer-left');
                        $gasImg.attr('src', './src/img/Gas_small.png')
                    },400);
                    setTimeout(function() {
                        $gas.hide();//隐藏图片
                    },1400)
                    // 播放砸蛋声音 换图片 
                    setTimeout(function() {
                        $eggbgm.attr('src', './hit.mp3');//砸蛋声音
                        $geggImg.eq(index).attr('src', './src/img/Gegg_broken.png')//换碎蛋图片 
                        popup();//弹出框
                    },1200)
                }else{
                    if(num > 0)return;//是否砸过蛋
                    num ++;
                    $gas.css('left', 190 + 85 * index + 'px');
                    $gas.show();//显示图片
                    $hammer.css('left', 190 + 85 * index + 'px');
                    setTimeout(function() {
                        $hammer.addClass('hammer-right');
                        $gasImg.attr('src', './src/img/Gas_smallLeft.png')
                    }, 400);
                    setTimeout(function() {
                        $gas.hide();//隐藏图片
                    },1400);
                    setTimeout(function() {
                        $eggbgm.attr('src', './hit.mp3');
                        $geggImg.eq(index).attr('src', './src/img/Gegg_brokenLeft.png');
                        popup();//弹出框
                    }, 1300)
                }
            })
        })
    }
    //弹出框
    function popup() {
        // console.log(1);
        var $popup = $('.popup');
        var $hammer = $('.hammer');
        var winTipCon = document.querySelector('.win-tip-con');
        var nexTbtnCon = document.querySelector('.next-btn-con');
        var timer = null;
       
        setTimeout(function() {
            $hammer.hide();
            $popup.show();
            nexTbtnCon.innerHTML = '';
            nexTbtnCon.innerHTML += winTipCon.innerHTML;//赋值
            //点击关闭
            $popup.click(function() {
                popupHide();
                clearTimeout(timer);
            })
            timer = setTimeout(function() {
                popupHide();
            },4000)
        }, 300)
    }
    //框消失
    function popupHide() {
        var $winTipHid = $('.win-tip');
        var $popupImg = $('.popup img');

            $winTipHid.addClass('wintip-hide');
            $popupImg.addClass('egg-hide');
            setTimeout(function() {
                $('.popup').hide();
            }, 2000)
    }
    return function() {
        Music();
        breakEggs();
        getMs();//更新时间
        upDateMs();
    }
}())
init();







    
   



