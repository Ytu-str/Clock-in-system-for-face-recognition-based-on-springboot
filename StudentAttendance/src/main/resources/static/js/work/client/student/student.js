function send_data(page) {
	$.ajax({
		type:"get",
		url:"/searchClass",
		async:false,
		data:{'num': page},
		success:function(res) {
			$('#sign-card').empty();
			for (var i = 0; i < res.length; i++) {
				var class_card = '<div class="card" class-id="'+res[i]["clsId"]+'"><img src="' + res[i]["clsPhoto"] + '" class="card-img-top"><div class="card-body"><h5 class="card-title">' + res[i]["clsName"] + '</h5><p class="card-text">' + res[i]["cls"] + '</p><button disabled type="button" class="btn btn-outline-purple sign-btn" data-toggle="modal" data-target="#exampleModalScrollable1">签到</button><span class="badge badge-danger"></span></div></div>';
				$('#sign-card').append(class_card);
				$('#clsName').append('<a class="dropdown-item" teacher-id="'+ res[i]['userId'] +'">'+ res[i]["userName"] +'</a>');
			}
			$('#clsName-btn').text(res[0]['userName']);
			$('#clsName-btn').attr("teacher-id", res[0]['userId']);
			//下拉按钮点击
			$('#btn-stuType div a').click(function(){
				var stuText = $(this).text();
				var teacher_id = $(this).attr('teacher-id');
				$('#clsName-btn').empty().append(stuText);
				$('#clsName-btn').attr('teacher-id', teacher_id);
			});
		},
		error: function(e) {
			alert('出现错误');
		}
	});
}
function searchStudent() {
	$.ajax({
		type:"post",
		url:"/searchStudent",
		async:true,
		success: function(res) {
			try {
				$('#stuName').val(res['userName']);
				$('#stuNumber').val(res['userStunum']);
				$('#stuDepartment').val(res['userSystem']);
				$('#stuClass').val(res['userClass']);
			} catch {
				alert('您还没有完善信息哦，抓紧去完善信息吧');
				window.location.href="https://www.shineqianmo.com/personal"
			}
		},
		error: function(e) {
			alert('出错');
		}
	});
	
}
//获取学生数据
// $.ajax({
// 	type:"post",
// 	url:"/searchStudent",
// 	async:false,
// 	success: function(res) {
// 		console.log(res)
// 		$('#stuName').val(res['userName']);
// 		$('#stuNumber').val(res['userStunum']);
// 		$('#stuDepartment').val(res['userSystem']);
// 		$('#stuClass').val(res['userClass']);
// 	},
// 	error: function(e) {
// 		console.log('无数据');
// 	}
// });
$('#add-class-btn').click(function() {
	var clsId = $('#clsNumber').val();
	$.ajax({
		type:"get",
		url:"/joinClass",
		data:{'id': clsId},
		async:true,
		success:function(res) {
			if(res) {
				alert('成功加入');
				window.location.href = "https://www.shineqianmo.com/index";
			} else {
				alert('加入失败');
			}
		},
		error: function(e) {
			alert('出现错误');
		}
	});
});

//请假
$('#leave').click(function() {
	var teacher_name = $('#btn-stuType button').attr('teacher-id');
	var stuTime = $('#stuTime').val();
	var leave_type = $('#btn-stuTypee button').text();
	var leave_reasan = $('#leave_reasan').val();
	console.log(teacher_name)
	console.log(stuTime)
	console.log(leave_type)
	console.log(leave_reasan)

	$.ajax({
		type:"post",
		url:"/leave",
		async:true,
		data: {'teacherName': teacher_name,'leaveTime': stuTime,'leaveType': leave_type,'leaveReason': leave_reasan},
		success: function(res) {
			alert(res);
			window.location.reload();
		},
		error: function() {
			alert('出错');
			window.location.reload();
		}
	});
});

function all_number() {
	$.ajax({
		type:"get",
		url:"/classNumCount",
		async: false,
		success: function(res) {
			all = parseInt(res);
		},
		error: function(e) {
			alert('出错');
		}
	});
}
var page_number = 6;

$.ajax({
	type:"get",
	url:"/login/CheckInStatus",
	async:true,
	success: function(res) {
		var $class_card = $(".card");
		$($class_card[a]).children('div').children('button').attr("disabled", "true");
		for (var a = 0; a < $class_card.length; a++) {
			for(var i = 0; i < res.length; i++) {
				if(res[i]["tsignClassId"] == $($class_card[a]).attr("class-id")) {
					$($class_card[a]).children('div').children('span').empty();
					$($class_card[a]).children('div').children('span').append( "正在考勤");
					$($class_card[a]).children('div').children('button').attr( "sign-id", res[i][ "tsignUid"]);
					$($class_card[a]).children('div').children('button').removeAttr( "disabled");
				}
			}
		}
	},
	error: function(e) {
		console.log("出错了");
	}
});
setInterval(function () {
	$.ajax({
		type:"get",
		url:"/login/CheckInStatus",
		async:true,
		success: function(res) {
			var $class_card = $(".card");
			$($class_card[a]).children('div').children('button').attr("disabled", "true");
			for (var a = 0; a < $class_card.length; a++) {
				for(var i = 0; i < res.length; i++) {
					if(res[i]["tsignClassId"] == $($class_card[a]).attr("class-id")) {
						$($class_card[a]).children('div').children('span').empty();
						$($class_card[a]).children('div').children('span').append( "正在考勤");
						$($class_card[a]).children('div').children('button').attr( "sign-id", res[i][ "tsignUid"]);
						$($class_card[a]).children('div').children('button').removeAttr( "disabled");
					}
				}
			}
		},
		error: function(e) {
			console.log("出错了");
		}
	});
}, 15000);

$.ajax({
	type:"get",
	url:"/teacherAndStudentNotice",
	async:false,
	success: function(res) {
		for (var i = 0; i < res.length; i++) {
			if (i == 0) {
				var lt1 = '<div class="carousel-item active"><p>'+ res[i]["noticeContent"];
				var at = '<li data-target="#carouselExampleCaptions2" data-slide-to="0" class="active"></li>';
			} else{
				var lt1 = '<div class="carousel-item"><p>'+ res[i]["noticeContent"];
				var at = '<li data-target="#carouselExampleCaptions2" data-slide-to="'+ i +'"></li>';
			}
			var lt2 = '</p><footer class="blockquote-footer text-right"><cite>'+ res[i]["noticeTime"] +'</cite></footer></div>';
			$('#announcementUl').append(at);
			$('#announcementAll').append(lt1 + lt2);
		}

	},
	error: function(e) {

	}
});