$('.btn-submenu').click(function() {
	$(this).siblings().removeClass('active');
	$(this).addClass('active');
	if ($(this).index() == 0) {
		$('.table-no-read').removeClass('d-none');
		$('.table-read').addClass('d-none');
	} else {
		$('.table-no-read').addClass('d-none');
		$('.table-read').removeClass('d-none');
	}
});

//未读总条数
function all_number() {
	$.ajax({
		type:"get",
		url:"/studentLeaveInformationNum",
		async:false,
		data: {"state": 0},
 		success: function(res) {
 			all = parseInt(res);
 		},
 		error: function(e) {
 			console.log("失败");
 		}
	});
}
//已读总条数
function all_numberr() {
	$.ajax({
		type:"get",
		url:"/studentLeaveInformationNum",
		async:false,
		data: {"state": 1},
 		success: function(res) {
			alll = parseInt(res);
 		},
 		error: function(e) {
 			console.log("失败");
 		}
	});
}

//未读获取数据
function send_data(page) {
	$.ajax({
		type:"get",
		url:"/studentLeaveInformation",
		async:true,
		data: {"state": 0, "num": page},
		success: function(res) {
			$('.table-no-read table').empty();
			$('.table-no-read table').append('<tr><th>学号</th><th>姓名</th><th>系别</th><th>班级</th><th>时长</th><th>请假类型</th><th>申请原因</th><th>审批理由</th><th>审批</th></tr>');
			for (var i = 0; i < res.length; i++) {
				var lt1 = '<tr leaveid="' + res[i]["leaveId"] + '" userid="'+ res[i]["userId"] +'">';
				var lt2 = '<td>' + res[i]["userStunum"] + '</td>';
				var lt3 = '<td>' + res[i]["userName"] + '</td>';
				var lt4 = '<td>' + res[i]["userSystem"] + '</td>';
				var lt5 = '<td>' + res[i]["userClass"] + '</td>';
				var lt6 = '<td>' + res[i]["leaveTime"] + '</td>';
				var lt7 = '<td>' + res[i]["leaveType"] + '</td>';
				var lt8 = '<td>' + res[i]["leaveReason"] + '</td>';
				var lt9 = '<td><input type="text" name="leaveContent" class="form-control leaveContent"/></td>';
				var lt10 = '<td><a href="#" class="btn btn-action btn-info m-1">通过</a><a href="#" class="btn btn-action btn-dark">不通过</a></td>';
				$('.table-no-read table').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10);
			}
			//审核请假
			$('.table-no-read table tr td a').click(function() {
				if($(this).text() == "通过") {
					var state = 1;
				} else {
					var state = 2;
				}
				var content = $(this).parent().siblings().eq(7).children("input").val();
				var id = $(this).parent().parent().attr("leaveid");
				var userId = $(this).parent().parent().attr("userid");
				$.ajax({
					type:"get",
					url:"/modifyLeaveStatus",
					async:true,
					data: {"state": state,"userId": userId,"id": id,"content": content},
					success: function(res) {
						if(res) {
							window.location.reload();
						} else {
							alert("失败的请求");
						}
					},
					error: function(e) {
						console.log("出错");
					}
				});
			});
		},
		error: function(e) {
			console.log("出错");
		}
	});
}


//已读获取数据
function send_dataa(pagee) {
	$.ajax({
		type:"get",
		url:"/studentLeaveInformation",
		async:true,
		data: {"state": 1, "num": pagee},
		success: function(res) {
			console.log(res)
			$('.table-read table').empty();
			$('.table-read table').append('<tr><th>学号</th><th>姓名</th><th>系别</th><th>班级</th><th>时长</th><th>请假类型</th><th>申请原因</th><th>审批理由</th><th>审批</th></tr>');
			for (var i = 0; i < res.length; i++) {
				var lt1 = '<tr leaveId="' + res[i]["leaveId"] + '" userId="'+ res[i]["userId"] +'">';
				var lt2 = '<td>' + res[i]["userStunum"] + '</td>';
				var lt3 = '<td>' + res[i]["userName"] + '</td>';
				var lt4 = '<td>' + res[i]["userSystem"] + '</td>';
				var lt5 = '<td>' + res[i]["userClass"] + '</td>';
				var lt6 = '<td>' + res[i]["leaveTime"] + '</td>';
				var lt7 = '<td>' + res[i]["leaveType"] + '</td>';
				var lt8 = '<td>' + res[i]["leaveReason"] + '</td>';
				if (res[i]["leaveCount"] == null ||res[i]["leaveCount"] == "") {
					var lt9 = '<td>无</td>';
				} else {
					var lt9 = '<td>' + res[i]["leaveCount"] + '</td>';
				}
				if(res[i]["leaveState"]== "1") {
					var lt10 = '<td>同意</td>';
				} else {
					var lt10 = '<td>不同意</td>';
				}
				$('.table-read table').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10);
			}
		},
		error: function(e) {
			console.log("出错");
		}
	});
}
var page_number = 10;
var page_numberr = 10;
//已读分页
//总条数
var alll = 0;
//请求函数-->获取总条数
all_numberr();
//页数
var all_pagee = Math.ceil(alll / page_numberr);
//添加按钮
$('#card-pagee').append('<li id="prev-page" class="page-item"><a class="page-link" href="#">上一页</a></li>');
for(var i = 1; i <= all_pagee; i++) {
	if (i > 5) {
		$('#card-pagee').append('<li class="click-pagee page-item d-none"><a class="page-link" href="#">'+ i +'</a></li>');
	} else {
		$('#card-pagee').append('<li class="click-pagee page-item"><a class="page-link" href="#">'+ i +'</a></li>');
	}
}
$('#card-pagee').append('<li id="next-page" class="page-item"><a class="page-link" href="#">下一页</a></li>');
$('.click-pagee').click(function() {
	$('.click-pagee').addClass('d-none');
	//页数
	var $page_indexx = $(this).index();
	if ($page_indexx <= 2) {
		$(this).removeClass('d-none');
		$(this).next().removeClass('d-none');
		$(this).next().next().removeClass('d-none');
		$(this).next().next().next().removeClass('d-none');
		if ($page_indexx == 1) {
			$(this).next().next().next().next().removeClass('d-none');
		} else {
			$(this).prev().removeClass('d-none');
		}
	} else if($page_indexx >= (all_pagee - 1)) {
		$(this).removeClass('d-none');
		$(this).prev().removeClass('d-none');
		$(this).prev().prev().removeClass('d-none');
		$(this).prev().prev().prev().removeClass('d-none');
		if ($page_indexx == all_pagee) {
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
	send_dataa($page_indexx);
});
send_dataa(1);