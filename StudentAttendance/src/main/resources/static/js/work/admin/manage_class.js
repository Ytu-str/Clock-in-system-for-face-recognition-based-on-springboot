function ud() {
    //更改信息
    $('.btn-upd').click(function() {
        var upclassName = $(this).parent().siblings().eq(0).text();
        $("#upclass").val(upclassName);
        upClassId = $(this).parent().parent().attr("classid");
    });
    //删除信息
    $('.btn-del').click(function() {
    	$btnDel = $(this);
    });
}
//获取数据
function send_data(pageNum) {
    $.ajax({
        type:"get",
        url:"/adminSelectSystemAndClass",
        async:true,
        data: {"system": department, "num": pageNum},
        success: function(res) {
            page(res['num'], 10);
            $('#all-class tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                for (var a = 0; a < res["list"][li]["dclassList"].length; a++) {
                	var lt1 = '<tr classid="' + res["list"][li]["dclassList"][a]["classId"] + '">';
                	var lt2 = '<td>' + res["list"][li]["dclassList"][a]["userClass"] + '</td>';
                	var lt3 = '<td sysid="'+ res["list"][li]["userUid"] +'">' + res["list"][li]["userSystem"] + '</td>';
                	var lt4 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del" data-toggle="modal" data-target="#staticBackdrop4"><i class="fa fa-trash"></i></button></td></tr>';
                	$('#all-class tbody').append(lt1 + lt2 + lt3 + lt4);
                }
            }
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
    fdepartment = department;
}

function fanye(pageNum) {
    $.ajax({
        type:"get",
        url:"/adminSelectSystemAndClass",
        async:true,
        data: {"system": fdepartment, "num": pageNum},
        success: function(res) {
            $('#all-class tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                for (var a = 0; a < res["list"][li]["dclassList"].length; a++) {
                	console.log(a)
                	var lt1 = '<tr classid="' + res["list"][li]["dclassList"][a]["classId"] + '">';
                	var lt2 = '<td>' + res["list"][li]["dclassList"][a]["userClass"] + '</td>';
                	var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
                	var lt4 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del" data-toggle="modal" data-target="#staticBackdrop4"><i class="fa fa-trash"></i></button></td></tr>';
                	$('#all-class tbody').append(lt1 + lt2 + lt3 + lt4);
                }
            }
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

var department = "";
var fdepartment = "";
var add_department = "";
var upd_department = "";
var page_index = null;
var upClassId = "";
var $btnDel;

$('#select').click(function() {
    send_data(1);
});

//获取系别
$.ajax({
	type: "get",
	url: "/selectSystem",
	async: true,
	success: function(res) {
		$('#department').append('<option sysid="">全部</option>');
		for(var i = 0; i < res.length; i++) {
			$('#department').append('<option sysid="' + res[i]["userUid"] + '">' + res[i]["userSystem"] + '</option>');
			$('#add-department').append('<option sysid="' + res[i]["userUid"] + '">' + res[i]["userSystem"] + '</option>');
			$('#upd-department').append('<option sysid="' + res[i]["userUid"] + '">' + res[i]["userSystem"] + '</option>');
		}
		department = $('#department option').eq(0).attr("sysid");
		add_department = $('#add-department option').eq(0).attr("sysid");
		upd_department = $('#upd-department option').eq(0).attr("sysid");
		$('#department').change(function() {
			department = $('#department option:selected').attr('sysid');
		});
		$('#add-department').change(function() {
			add_department = $('#add-department option:selected').attr('sysid');
		});
		$('#upd-department').change(function() {
			upd_department = $('#upd-department option:selected').attr('sysid');
		});
	}
});

$('#updateleave').click(function () {
    $.ajax({
        type: "get",
        url: "/adminUpdateBeLongToSystem",
        async: true,
        data: {"system": upd_department, "dclass": upClassId},
        success: function (res) {
            if (res) {
                alert("修改成功");
            } else {
                alert("修改失败 ");
            }
            window.location.reload();
        },
        error: function (e) {
            console.log("出错");
        }
    });
});

//添加班级
$('#add-class-btn').click(function() {
	var className = $('#className').val();
	$.ajax({
		type: "get",
		url: "/adminInsertClass",
		async: true,
		data: {
			"className": className,
			"systemId": add_department
		},
		success: function(res) {
			if(res) {
				alert("添加班级成功");
			} else {
				alert("添加班级失败 ");
			}
			window.location.reload();
		},
		error: function(e) {
			console.log("出错");
		}
	});
});
//添加系别
$('#add-department-btn').click(function() {
	var departmentName = $('#departmentName').val();
	$.ajax({
		type: "get",
		url: "/adminInsertSystem",
		async: true,
		data: {
			"systemName": departmentName
		},
		success: function(res) {
			if(res) {
				alert("添加系别成功");
			} else {
				alert("添加系别失败 ");
			}
			window.location.reload();
		},
		error: function(e) {
			console.log("出错");
		}
	});
});
//删除
$('#del-class-department-btn').click(function() {
	var departmentListId = new Array();
	var classListId = new Array();
	console.log($btnDel)
	if ($('#del-motal').val() == "系别") {
		departmentListId.push($btnDel.parent().siblings().eq(1).attr("sysid"));
	} else {
		classListId.push($btnDel.parent().parent().attr("classid"));
	}
	$.ajax({
		type: "get",
		url: "/adminDeleteSystemPerhapsClass",
		async: true,
		traditional: true,
		data: {
			"systemList": departmentListId,
			"classList": classListId
		},
		success: function(res) {
			alert("成功删除");
			window.location.reload();
		},
		error: function(e) {
			console.log("失败");
		}
	});
});
send_data(1);