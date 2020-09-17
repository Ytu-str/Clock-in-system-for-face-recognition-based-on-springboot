//获取锚点平滑滚动
$("#nav-menu li a").click(function () {
	if($(this).parent().index() > 0 && $(this).parent().index() < 4) {	
		$('.all-student-use').children('div').css('display', 'none');
		var id_href = $(this).attr('href');
		$(id_href).css('display', 'block');
	}
	//点击效果
	$('#navbarSupportedContent ul li').removeClass('active');
	$(this).addClass('active');
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -20+ "px"}, 500);
    return false;
});
$("#zzjh").click(function () {
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -20+ "px"}, 500);
    return false;
});


$('#btn-stuTypee div a').click(function(){
    var stuText = $(this).text();
    $('#btn-stuTypee button').empty().append(stuText);
});
//回到顶部
$('.go-top').on('click',function () {
    $("html, body").animate({scrollTop: 0 }, {duration: 500,easing: "swing"});
    return false;
});
//监听回到顶部
$(window).bind('scroll',function(){
    if(window.innerWidth >= 768){
        var len=$(this).scrollTop();
        if(len>=100){
            //显示回到顶部按钮
            $('.go-top').fadeIn('1000');
        }else{
            //影藏回到顶部按钮
            $('.go-top').fadeOut('1000');
        }
    }else {
        var len=$(this).scrollTop();
        if(len>=100){
            //显示回到顶部按钮
            $('.go-top').fadeIn('1000');
        }else{
            //影藏回到顶部按钮
            $('.go-top').fadeOut('1000');
        }
    }
});

//个人信息
$('#my-message').click(function() {
    window.location.href = "https://www.shineqianmo.com/personal";
});