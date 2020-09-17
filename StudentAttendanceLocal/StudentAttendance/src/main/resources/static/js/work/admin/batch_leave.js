function ud() {
    //删除信息
    $('.btn-del').click(function() {
        var listId = new Array();
        $('.check-input').each(function() {
            if ($(this).prop("checked")) {
                listId.push($(this).parent().parent().attr("leaveid"));
            }
        })
        if (confirm("您确定要删除"+listId.length+"条吗?")) {
            var lisId = $.makeArray(listId);
            $.ajax({
                type:"get",
                url:"/adminDeleteLeaveInformation",
                async:true,
                traditional: true,
                data: {"leaveId": lisId},
                success:function(res) {
                    alert("成功删除");
                    window.location.reload();
                },
                error: function(e) {
                    console.log("失败");
                }
            });
        }
    });
}
//获取数据
function send_data(pageNum) {
    var keyWord = $('#leaveKeyword').val();
    $.ajax({
        type:"get",
        url:"/adminLeaveInformation",
        async:true,
        data: {"userName": keyWord, "clsSystem": userSystem, "className": userClass, "num": pageNum},
        success: function(res) {
            page(res['leaveNum'], 10);
            $('#all-leave tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                var lt1 = '<tr leaveid="' + res["list"][li]["leaveId"] + '">';
                var lt2 = '<td userid="'+ res["list"][li]["userId"] +'"><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["userName"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["userClass"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["leaveType"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["leaveReason"] + '</td>';
                var lt7 = '<td>' + res["list"][li]["leaveTime"] + '</td>';
                var lt8 = '<td teacherid="'+ res["list"][li]["leaveTeacher"] +'">' + res["list"][li]["teacherName"] + '</td>';
                if (res["list"][li]["leaveState"] == "1") {
                    var leaState = "通过";
                } else if (res["list"][li]["leaveState"] == "2") {
                    var leaState = "不通过";
                } else {
                    var leaState = "未审核";
                }
                var lt9 = '<td>' + leaState + '</td>';
                if (res["list"][li]["leaveCount"] == null||res["list"][li]["leaveCount"] == "") {
                    var leaContent = "无";
                } else {
                    var leaContent = res["list"][li]["leaveCount"];
                }
                var lt10 = '<td>' + leaContent + '</td>';
                var lt11 = '<td><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-leave tbody').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10 + lt11);
            }
            $('#all-leave tbody tr').click(function() {
                //现在模式反选
                $(this).children().eq(0).children().eq(0).prop("checked", !$(this).children().eq(0).children().eq(0).prop("checked"));
            })
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
    fKeyWord = keyWord;
    fUserClass = userClass;
    fUserSystem = userSystem;
}

function fanye(pageNum) {
    $.ajax({
        type:"get",
        url:"/adminLeaveInformation",
        async:true,
        data: {"userName": fKeyWord, "clsSystem": fUserSystem, "className": fUserClass, "num": pageNum},
        success: function(res) {
            $('#all-leave tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                var lt1 = '<tr leaveid="' + res["list"][li]["leaveId"] + '">';
                var lt2 = '<td userid="'+ res["list"][li]["userId"] +'"><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["userName"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["userClass"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["leaveType"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["leaveReason"] + '</td>';
                var lt7 = '<td>' + res["list"][li]["leaveTime"] + '</td>';
                var lt8 = '<td teacherid="'+ res["list"][li]["leaveTeacher"] +'">' + res["list"][li]["teacherName"] + '</td>';
                if (res["list"][li]["leaveState"] == "1") {
                    var leaState = "通过";
                } else if (res["list"][li]["leaveState"] == "2") {
                    var leaState = "不通过";
                } else {
                    var leaState = "未审核";
                }
                var lt9 = '<td>' + leaState + '</td>';
                if (res["list"][li]["leaveCount"] == null||res["list"][li]["leaveCount"] == "") {
                    var leaContent = "无";
                } else {
                    var leaContent = res["list"][li]["leaveCount"];
                }
                var lt10 = '<td>' + leaContent + '</td>';
                var lt11 = '<td><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-leave tbody').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10 + lt11);
            }
            $('#all-leave tbody tr').click(function() {
                //现在模式反选
                $(this).children().eq(0).children().eq(0).prop("checked", !$(this).children().eq(0).children().eq(0).prop("checked"));
            })
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

var userSystem = "";
var userClass = "";
var fKeyWord = "";
var fUserSystem = "";
var page_index = null;
var fUserClass = "";


$('#select').click(function() {
    send_data(1);
});

//获取系别
$.ajax({
    type: "get",
    url: "/selectSystem",
    async: true,
    success: function(res) {
        for(var i = 0; i < res.length; i++) {
            $('#department').append('<option sysid="' + res[i]["userUid"] + '">' + res[i]["userSystem"] + '</option>');
        }
        userSystem = $('#department option').eq(0).attr("sysid");
        $.ajax({
            type: "get",
            url: "/selectClass",
            async: false,
            data: {
                "userUid": userSystem
            },
            success: function(res) {
                $('#userClass option').remove();
                $('#userClass').append('<option classid="">全部</option>')
                for(var c = 0; c < res.length; c++) {
                    $('#userClass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
                }
                $('#userClass').change(function() {
                    userClass = $('#userClass option:selected').attr("classid");
                });
                userClass = $('#userClass option').eq(0).attr("classid");
            }
        });
        $('#department').change(function () {
            userSystem = $('#department option:selected').attr("sysid");
            $.ajax({
                type: "get",
                url: "/selectClass",
                async: false,
                data: {
                    "userUid": userSystem
                },
                success: function(res) {
                    $('#userClass option').remove();
                    $('#userClass').append('<option classid="">全部</option>')
                    for(var c = 0; c < res.length; c++) {
                        $('#userClass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
                    }
                    $('#userClass').change(function() {
                        userClass = $('#userClass option:selected').attr("classid");
                    });
                    userClass = $('#userClass option').eq(0).attr("classid");
                }
            });
        })
    }
});

send_data(1);