//gnb
$(function(){

    const $gnb = $("header>nav>.gnb>li");
    const $sub = $gnb.find(".sub");
    let nowIdx = 0;

    //각 메뉴글자의 width값을 추출해야 margin-left 값 설정가능
    // console.log($gnb.eq(0).find('span').width());
    // console.log($gnb.eq(1).find('span').width());
    // console.log($gnb.eq(2).find('span').width());
    // console.log($gnb.eq(3).find('span').width());
    // console.log($gnb.eq(4).find('span').width());

    
    
    $gnb.on({
        "mouseenter":function(){
            nowIdx = $gnb.index(this);
            $sub.eq(nowIdx).fadeIn(100);

            //활성화 표시용 .bar 요소를 동적으로 추가
            $gnb.eq(nowIdx).children("a").append("<span class='bar'></span>");
            
            //해당 메뉴문자의 width를 동적으로 측정
            const barW = $gnb.eq(nowIdx).find('span').first().width();

            //활성화 표시용 .bar의 CSS속성 설정
            $gnb.eq(nowIdx).find(".bar").css({
                width : barW,
                marginLeft : -barW/2
            });
        }
        ,
        "mouseleave":function(){
            $(".bar").remove();//특정요소만 제거하는 .remove()
            $sub.hide();
        }
    });

});

//slide banner
$(function(){
    const $bannCont = $('section>.banner>.banner-container>.banner-img');
    const $indicator = $('section>.banner>.banner-container>.indicator>li>a');
    const $preve = $('section>.banner>.banner-container>.prev-next>li:nth-of-type(1)>a');
    const $next = $('section>.banner>.banner-container>.prev-next>li:nth-of-type(2)>a');

    const $bannPlay = $('section>.banner>.banner-container>p.play>a');

    let nowIdx = 0;
    let intervalKey = null;
    

    //함수선언
    const slideBanner = function(){
        //배너 이미지 슬라이드 
        $bannCont.stop().animate({left : -940 * nowIdx});
        
        //인디케이터 활성화
        $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    }

    //윈도우 로드이벤트
    $(window).on('load', function(){
        $bannPlay.trigger('click');
    });

    //인디케이터 클릭
    $indicator.on('click', function(evt){
        evt.preventDefault();
        
        nowIdx = $indicator.index(this);
        
        slideBanner();
        
        clearInterval(intervalKey);
        $bannPlay.parent().removeClass('pause').addClass('play');
    });
    
    //이전 버튼 클릭
    $preve.on('click', function(){
        
        if(nowIdx > 0){
            nowIdx --;
        }else{nowIdx = 2;}
        
        slideBanner();
        clearInterval(intervalKey);
        $bannPlay.parent().removeClass('pause').addClass('play');
    });
    
    //다음 버튼 클릭
    $next.on('click', function(){
        
        if(nowIdx < 2){
            nowIdx ++;
        }else{nowIdx = 0;}
        
        slideBanner();
        
        clearInterval(intervalKey);
        $bannPlay.parent().removeClass('pause').addClass('play');
    });


    //재생버튼 클릭
    $bannPlay.on('click', function(evt){
        evt.preventDefault();
        
        // console.log($(this).parent().hasClass("play"));
        clearInterval(intervalKey);

        //재생/정지 클릭시 class명 변경
        if($(this).parent().hasClass("play")){
            $(this).parent().removeClass('play').addClass('pause');
            intervalKey = setInterval(function(){
                if(nowIdx < 2){
                    nowIdx ++;
                }else{nowIdx = 0;}
                
                slideBanner();
                
            },3000);
        }else{
            $(this).parent().removeClass('pause').addClass('play');
            clearInterval(intervalKey);
        }
    });
});

//fade banner
$(function(){
    const $playFade = $('section>.recruit>.story>.play');
    const $pauseFade = $('section>.recruit>.story>.pause');
    const $story = $('section>.recruit>.story>ul>li');
    const $story_1 = $('section>.recruit>.story>ul>li:nth-of-type(2)>h4>a')
    const $story_2 = $('section>.recruit>.story>ul>li:nth-of-type(1)>h4>a')

    let nowIdx = 0;
    let oldIdx = null;
    let intervalKey = null;

    //로드이벤트
    $(window).on('load', function(){
        $playFade.trigger('click');
    });


    //재생 클릭
    $playFade.on('click', function(evt){
        evt.preventDefault();

        clearInterval(intervalKey);
        
        intervalKey = setInterval(function(){
            oldIdx = nowIdx;
            console.log("old", nowIdx);
            $story.eq(nowIdx).fadeOut()
            if(nowIdx == 0){
                nowIdx ++;
            }else{
                nowIdx = 0;
            }
            $story.eq(nowIdx).fadeIn();
            console.log("now", nowIdx);
        }, 4000);

        $(this).addClass('on').siblings($pauseFade).removeClass('on');
        
    });

    //일시정지 클릭
    $pauseFade.on('click', function(evt){
        evt.preventDefault();

        clearInterval(intervalKey);

        $(this).addClass('on').siblings('a').removeClass('on');
    });

    //story_1 (삼표인 이야기) 보기
    $story_1.on('click', function(evt){
        evt.preventDefault();

        $('.story_2').fadeOut();
        $('.story_1').fadeIn();

        clearInterval(intervalKey);
        $pauseFade.trigger('click');
    });
    
    //story_2 (면접관 이야기) 보기
    $story_2.on('click', function(evt){
        evt.preventDefault();
        
        $('.story_1').fadeOut();
        $('.story_2').fadeIn();
        
        clearInterval(intervalKey);
        $pauseFade.trigger('click');
    });

});

//옵션박스
$(function(){
    const $map = $('section>.inside>.path>.map');
    const $groupOption = $('section>.inside>.path>.map>.group>a');
    const $groupBox = $('section>.inside>.path>.map>.group-box');
    const $partOption = $('section>.inside>.path>.map>.part>a');
    const $partBox = $('section>.inside>.path>.map>.part-box');
    
    const $option = $groupBox.find('li>a');
    const $option_2 = $partBox.find('li>a');

    let optionIdx = 0;
    
    //group 옵션박스 클릭
    $groupOption.on({
        "click" : function(evt){
            evt.preventDefault();

            $groupBox.toggle();
        },
        "mouseenter" : function(){
            // alert('adkfj')
            $partBox.hide();
        }
    });
    
    //part 옵션박스 클릭
    $partOption.on({
        "click" : function(evt){
            evt.preventDefault();

            $partBox.toggle();
        },
    });

    //옵션박스 숨김
    $map.on('mouseleave', function(){
        $(this).find('ul').hide();
    });

    //그룹옵션 클릭시 텍스트 교체
    $option.on('click',function(evt){
        evt.preventDefault();

        let nowOption = $(this).text();
        optionIdx = $option.index(this);

        console.log(nowOption);
        console.log(optionIdx);

        $groupOption.text(nowOption);
        $partOption.text('선택하세요');

        $partBox.children('li').eq(optionIdx).addClass('on').siblings().removeClass('on');
        $map.find('ul').hide();
    });

    //파트옵션 클릭시 텍스트 교체
    $option_2.on('click',function(evt){
        evt.preventDefault();

        let nowOption = $(this).text();

        console.log(nowOption);

        $partOption.text(nowOption);

        $map.find('ul').hide();
    });


});