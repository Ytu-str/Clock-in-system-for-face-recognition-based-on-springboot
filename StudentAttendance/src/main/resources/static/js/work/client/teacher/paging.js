//总条数
var all = 0;
//请求函数-->获取总条数
all_number();
//第几页
var page_index = 1;
//页数
var all_page = Math.ceil(all / page_number);
//添加按钮
$('#card-page').append('<li id="prev-page" class="page-item"><a class="page-link" href="javascript:void(0)">上一页</a></li>');
for(var i = 1; i <= all_page; i++) {
	if (i > 5) {
		$('#card-page').append('<li class="click-page page-item d-none page-itemmm"><a class="page-link" href="javascript:void(0)">'+ i +'</a></li>');
	} else {
		$('#card-page').append('<li class="click-page page-item page-itemmm"><a class="page-link" href="javascript:void(0)">'+ i +'</a></li>');
	}
}
$('#card-page').append('<li id="next-page" class="page-item page-itemmm"><a class="page-link" href="javascript:void(0)">下一页</a></li>');
$('#prev-page').click(function () {
	page_index = --page_index;
	if (page_index <= 0) {
		page_index = page_index + 1;
		alert("当前已经是第一页");
	} else {
		$($('.click-page')[page_index - 1]).click();
	}
});
$('#next-page').click(function () {
	page_index = ++page_index;
	if (page_index >= $('.page-itemmm').length) {
		page_index = page_index - 1;
		alert("当前已经是最后一页");
	}else if(page_index == 1) {
		$($('.click-page')[page_index]).click();
	} else {
		$($('.click-page')[page_index - 1]).click();
	}
});
$('.click-page').click(function() {
	$('.click-page').addClass('d-none');
	//页数
	page_index = $(this).index();
	if (page_index <= 2) {
		$(this).removeClass('d-none');
		$(this).next().removeClass('d-none');
		$(this).next().next().removeClass('d-none');
		$(this).next().next().next().removeClass('d-none');
		if (page_index == 1) {
			$(this).next().next().next().next().removeClass('d-none');
		} else {
			$(this).prev().removeClass('d-none');
		}
	} else if(page_index >= (all_page - 1)) {
		$(this).removeClass('d-none');
		$(this).prev().removeClass('d-none');
		$(this).prev().prev().removeClass('d-none');
		$(this).prev().prev().prev().removeClass('d-none');
		if (page_index == all_page) {
			$(this).prev().prev().prev().prev().removeClass('d-none');
		} else {
			$(this).next().removeClass('d-none');
		}
	} else {
		$(this).removeClass('d-none');
		$(this).next().removeClass('d-none');
		$(this).next().next().removeClass('d-none');
		$(this).prev().removeClass('d-none');
		$(this).prev().prev().removeClass('d-none');
	}
	//发送请求获取数据
	send_data(page_index);
});
send_data(1);