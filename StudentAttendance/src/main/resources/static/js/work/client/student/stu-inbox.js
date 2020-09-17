function s_d(page) {
	$.ajax({
		type: "get",
		url: "/studentReceive",
		async: true,
		data: {
			'num': page
		},
		success: function(res) {
			$('.inbox-media-row').remove();
			var e2 = '';
			var e5 = '';
			for(var inbox_i = 0; inbox_i < res.length; inbox_i++) {
				var e1 = '<div class="row inbox-media-row"><div class="media inbox-click w-100" inbox-id="' + res[inbox_i]["id"] + '">';
				var e3 = '<h5 class="mt-0">' + res[inbox_i]["inboxName"] + '</h5>';
				var e4 = '<p>' + res[inbox_i]["content"] + '</p>';
				if(res[inbox_i]["type"] == '考勤') {
					e2 = '<img src="../images/inbox-sign.png" class="mr-3"><div class="media-body">';
				} else if(res[inbox_i]["type"] == '请假') {
					e2 = '<img src="../images/inbox-leave.png" class="mr-3"><div class="media-body">';
				} else {
					e2 = '<img src="../images/inbox-work.png" class="mr-3"><div class="media-body">';
				}
				if(res[inbox_i]["state"] == 0) {
					e5 = '</div><div class="badge badge-pill badge-danger mt-4"></div></div></div>';
				} else {
					e5 = '</div><div class="badge badge-pill badge-danger mt-4">未</div></div></div>';
				}
				$('#inbox-ul-page').prepend(e1 + e2 + e3 + e4 + e5);
			}
			//点击进入邮件 详情页
			$('.inbox-click').click(function() {
				var inbox_id = $(this).attr('inbox-id');
				window.open("https://www.shineqianmo.com/inboxParticulars?inboxId=" + inbox_id);
			});
		},
		error: function(e) {
			alert('收件箱获取不到数据');
		}
	});
}
//总条数
var all = 0;
$.ajax({
	type:"get",
	url:"/InboxNum",
	async:false,
	success: function(res) {
		all = res;
	},
	error: function(e) {
		alert('出错了');
	}
});
var page_numberr = 5;
//页数
var page_indexx = 1;
var all_pagee = Math.ceil(all / page_numberr);
//添加按钮
$('#stu-inbox').append('<li id="prev-pagee" class="page-item "><a class="page-link" href="javascript:void(0)">上一页</a></li>');
for(var i = 1; i <= all_pagee; i++) {
	if (i > 5) {
		$('#stu-inbox').append('<li class="click-pagee page-item page-itemm d-none"><a class="page-link" href="javascript:void(0)">'+ i +'</a></li>');
	} else {
		$('#stu-inbox').append('<li class="click-pagee page-item page-itemm"><a class="page-link" href="javascript:void(0)">'+ i +'</a></li>');
	}
}
$('#stu-inbox').append('<li id="next-pagee" class="page-item page-itemm"><a class="page-link" href="javascript:void(0)">下一页</a></li>');
$('#prev-pagee').click(function () {
	page_indexx = --page_indexx;
	if (page_indexx <= 0) {
		page_indexx = page_indexx + 1;
		alert("当前已经是第一页");
	} else {
		$($('.click-pagee')[page_indexx - 1]).click();
	}
});
$('#next-pagee').click(function () {
	page_indexx = ++page_indexx;
	if (page_indexx >= $('.page-itemm').length) {
		page_indexx = page_indexx - 1;
		alert("当前已经是最后一页");
	}else if(page_indexx == 1) {
		$($('.click-pagee')[page_indexx]).click();
	} else {
		$($('.click-pagee')[page_indexx - 1]).click();
	}
});
$('.click-pagee').click(function() {
	$('.click-pagee').addClass('d-none');
	//页数
	page_indexx = $(this).index();
	if (page_indexx <= 2) {
		$(this).removeClass('d-none');
		$(this).next().removeClass('d-none');
		$(this).next().next().removeClass('d-none');
		$(this).next().next().next().removeClass('d-none');
		if (page_indexx == 1) {
			$(this).next().next().next().next().removeClass('d-none');
		} else {
			$(this).prev().removeClass('d-none');
		}
	} else if(page_indexx >= (all_pagee - 1)) {
		$(this).removeClass('d-none');
		$(this).prev().removeClass('d-none');
		$(this).prev().prev().removeClass('d-none');
		$(this).prev().prev().prev().removeClass('d-none');
		if (page_indexx == all_pagee) {
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
	s_d(page_indexx);
});
s_d(1);



