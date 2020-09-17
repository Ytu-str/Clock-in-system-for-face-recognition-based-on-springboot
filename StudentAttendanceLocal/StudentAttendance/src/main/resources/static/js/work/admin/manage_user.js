function send_data(pageNum) {
	var userKeyword = $('#userKeyword').val();
	var people = $('#people').val();
	if(people == "老师") {
		var userType = "1";
	} else if(people == "学生") {
		var userType = "0";
	} else if(people == "管理员") {
		var userType = "2";
	} else {
		var userType = "";
	}
	$.ajax({
		type:"get",
		url:"/selectUserInformation",
		async:true,
		data: {'userName': userKeyword, 'userType': userType, 'userSystem': department, 'userClass': stu_class, "num": pageNum},
		success: function(res) {
			page(res['countNum'], 10);
			$('#all-user tbody tr').remove();
			for (var li = 0; li < res["list"].length; li++) {
				var lt1 = '<tr userId="' + res["list"][li]["userId"] + '">';
				var lt2 = '<td>' + res["list"][li]["userStunum"] + '</td>';
				var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
				var lt4 = '<td>' + res["list"][li]["userClass"] + '</td>';
				var lt5 = '<td>' + res["list"][li]["userQues"] + '</td>';
				var lt6 = '<td>' + res["list"][li]["userAnswer"] + '</td>';
				var lt7 = '<td>' + res["list"][li]["userName"] + '</td>';
				var lt8 = '<td>' + res["list"][li]["userNumber"] + '</td>';
				var lt9 = '<td>' + res["list"][li]["userIdentity"] + '</td>';
				var lt10 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
				$('#all-user tbody').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10);
			}
			$('.btn-upd').click(function() {
				var upstunum = $(this).parent().siblings().eq(0).text();
				var upques = $(this).parent().siblings().eq(3).text();
				var upanwer = $(this).parent().siblings().eq(4).text();
				var upname = $(this).parent().siblings().eq(5).text();
				var upnum = $(this).parent().siblings().eq(6).text();
				var upidt = $(this).parent().siblings().eq(7).text();
				upUserid = $(this).parent().parent().attr("userid");
				$("#uuserStunum").val(upstunum);
				$('#uuserQuestion').val(upques);
				$('#uuserAnswer').val(upanwer);
				$('#uuserName').val(upname);
				$('#uuserNumber').val(upnum);
				$('#uuseridtity').val(upidt);

			});
			$('.btn-del').click(function() {
				if (confirm("您确定要删除吗?")) {
					var listId = new Array();
					listId.push($(this).parent().parent().attr("userid"));
					var lisId = $.makeArray(listId);
					$.ajax({
						type:"get",
						url:"/delectUser",
						async:true,
						traditional: true,
						data: {"list": lisId},
						success:function(res) {
							alert("成功删除");
						},
						error: function(e) {
							console.log("失败");
						}
					});
				}
			});

		},
		error: function(e) {
			console.log('出错了');
		}
	});
	pagedata1 = userKeyword;
	pagedata2 = userType;
	pagedata3 = department;
	pagedata4 = stu_class;
}

function fanye(pageNum) {
	$.ajax({
		type:"get",
		url:"/selectUserInformation",
		async:true,
		data: {'userName': pagedata1, 'userType': pagedata2, 'userSystem': pagedata3, 'userClass': pagedata4, "num": pageNum},
		success: function(res) {
			$('#all-user tbody tr').remove();
			for (var li = 0; li < res["list"].length; li++) {
				var lt1 = '<tr userId="' + res["list"][li]["userId"] + '">';
				var lt2 = '<td>' + res["list"][li]["userStunum"] + '</td>';
				var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
				var lt4 = '<td>' + res["list"][li]["userClass"] + '</td>';
				var lt5 = '<td>' + res["list"][li]["userQues"] + '</td>';
				var lt6 = '<td>' + res["list"][li]["userAnswer"] + '</td>';
				var lt7 = '<td>' + res["list"][li]["userName"] + '</td>';
				var lt8 = '<td>' + res["list"][li]["userNumber"] + '</td>';
				var lt9 = '<td>' + res["list"][li]["userIdentity"] + '</td>';
				var lt10 = '<td><button class="btn btn-purplee btn-xs"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
				$('#all-user tbody').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10);
			}
		},
		error: function(e) {
			console.log('出错了');
		}
	});
}
$('#select-user').click(function() {
	send_data(1);
});

var department = "";
var stu_class = "";
var userSystem = "";
var pagedata1 = "";
var pagedata2 = "";
var pagedata3 = "";
var pagedata4 = "";
var page_index = null;
var userSystem = "";
var userClass = "";
var uuserSystem = "";
var uuserClass = "";
var upUserid = "";
//获取系别
$.ajax({
	type:"get",
	url:"/selectSystem",
	async:true,
	success:function(res) {
		for (var i = 0; i < res.length; i++) {
			$('#department').append('<option sysid="'+ res[i]["userUid"] +'">'+ res[i]["userSystem"] +'</option>');
			$('#userSystem').append('<option sysid="'+ res[i]["userUid"] +'">'+ res[i]["userSystem"] +'</option>');
			$('#uuserSystem').append('<option sysid="'+ res[i]["userUid"] +'">'+ res[i]["userSystem"] +'</option>');
		}
		uuserSystem = $('#uuserSystem option').eq(0).attr("sysid");
		$.ajax({
			type: "get",
			url: "/selectClass",
			async: false,
			data: {
				"userUid": uuserSystem
			},
			success: function(res) {
				$('#uuserClass option').remove();
				for(var c = 0; c < res.length; c++) {
					$('#uuserClass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
				}
				$('#uuserClass').change(function() {
					uuserClass = $('#uuserClass option:selected').attr("classid");
				});
				uuserClass = $('#uuserClass option').eq(0).attr("classid");
			}
		});
		$('#department').change(function() {
			department = $('#department option:selected').attr("sysid");
			stu_class = "";
			$.ajax({
				type:"get",
				url:"/selectClass",
				async:true,
				data: {"userUid": department},
				success:function(res) {
					$('#stu-class option').remove();
					$('#stu-class').append('<option>全部</option>');
					for(var b = 0; b < res.length; b++) {
						$('#stu-class').append('<option classid="' + res[b]["classId"] + '">' + res[b]["userClass"] + '</option>')
					}
					$('#stu-class').change(function() {
						stu_class = $('#stu-class option:selected').attr("classid");
					});
				},
				error: function(e) {
					
				}
			});
			stu_class = $('#stu_class option').eq(0).attr("classid");
		});
		$('#userSystem').change(function() {
			userSystem = $('#userSystem option:selected').attr("sysid");
			$.ajax({
				type: "get",
				url: "/selectClass",
				async: false,
				data: {
					"userUid": userSystem
				},
				success: function(res) {
					$('#userClass option').remove();
					for(var c = 0; c < res.length; c++) {
						$('#userClass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
					}
					$('#userClass').change(function() {
						userClass = $('#userClass option:selected').attr("classid");
					});
				},
				error: function(e) {

				}
			});
			userClass = $('#userClass option').eq(0).attr("classid");
		});
		$('#uuserSystem').change(function() {
			uuserSystem = $('#uuserSystem option:selected').attr("sysid");
			$.ajax({
				type: "get",
				url: "/selectClass",
				async: false,
				data: {
					"userUid": uuserSystem
				},
				success: function(res) {
					$('#uuserClass option').remove();
					for(var c = 0; c < res.length; c++) {
						$('#uuserClass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
					}
					$('#uuserClass').change(function() {
						uuserClass = $('#uuserClass option:selected').attr("classid");
					});
				},
				error: function(e) {

				}
			});
			uuserClass = $('#uuserClass option').eq(0).attr("classid");
		});
	}
});
send_data(1);
//添加用户
$('#add-user-btn').click(function() {
	var userNumber = $('#userNumber').val();
	var userPassword = $('#userPassword').val();
	var userAffirmPassword = $('#userAffirmPassword').val();
	var userType = $('#userType').val();
	var userStunum = $('#userStunum').val();
	var userQuestion = $('#userQuestion').val();
	var userAnswer = $('#userAnswer').val();
	if(userPassword == userAffirmPassword) {
		if(userNumber == "" || userPassword == "" || userType == "") {
			alert("必填项为空不可注册!")
		} else {
			if (userType == "老师") {
				userType = "1";
			} else if (userType == "管理员") {
				userType = "2";
			} else {
				userType = "0";
			}
			$.ajax({
				type: "get",
				url: "/createUser",
				async: true,
				data: {
					"userNumber": userNumber,
					"userPass": userPassword,
					"userJion": userType,
					"userStunum": userStunum,
					"userSystem": userSystem,
					"userClass": userClass,
					"userQues": userQuestion,
					"userAnswer": userAnswer,
				},
				success: function(res) {
					if(res) {
						alert("添加成功");
						window.location.reload();
					} else {
						console.log("添加失败!")
					}
				},
				error: function(e) {
					console.log("失败");
				}
			});
		}
	} else {
		alert("两次密码输入不一致请重新输入!");
		$('#userPassword').val("");
		$('#userAffirmPassword').val("");
	}
});
//更改用户
$('#upd-user-btn').click(function() {
	var uuserNumber = $('#uuserNumber').val();
	var uuserStunum = $('#uuserStunum').val();
	var uuserQuestion = $('#uuserQuestion').val();
	var uuserAnswer = $('#uuserAnswer').val();
	var uuserName = $('#uuserName').val();
	var uuserIdt = $('#uuseridtity').val();
	$.ajax({
		type: "get",
		url: "/updateUser",
		async: true,
		data: {
			"userId": upUserid,
			"userNumber": uuserNumber,
			"userStunum": uuserStunum,
			"userSystem": uuserSystem,
			"userClass": uuserClass,
			"userQues": uuserQuestion,
			"userAnswer": uuserAnswer,
			"userName": uuserName,
			"userIdentity": uuserIdt
		},
		success: function(res) {
			if(res) {
				alert("更改成功");
				window.location.reload();
			} else {
				console.log("更改失败!")
			}
		},
		error: function(e) {
			console.log("失败");
		}
	});
});