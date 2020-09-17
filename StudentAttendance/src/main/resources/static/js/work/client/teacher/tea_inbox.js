function all_number() {
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
}
function send_data(page) {
	$.ajax({
		type: "get",
		url: "/studentReceive",
		async: true,
		data: {
			'num': page
		},
		success: function(res) {
			$('.inbox-media-row').remove();
			var e2 = '<img src="../images/inbox-work.png" class="mr-3"><div class="media-body">';
			var e5 = '';
			for(var inbox_i = 0; inbox_i < res.length; inbox_i++) {
				var e1 = '<div class="row inbox-media-row"><div class="media inbox-click bg-white p-3 w-100" inbox-id="' + res[inbox_i]["id"] + '">';
				var e3 = '<h5 class="mt-0">' + res[inbox_i]["inboxName"] + '</h5>';
				var e4 = '<p>' + res[inbox_i]["content"] + '</p>';
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



var page_number = 10;