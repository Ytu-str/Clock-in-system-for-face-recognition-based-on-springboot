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
                var lt2 = '<td><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["userStunum"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["userClass"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["userQues"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["userAnswer"] + '</td>';
                var lt7 = '<td>' + res["list"][li]["userName"] + '</td>';
                var lt8 = '<td>' + res["list"][li]["userNumber"] + '</td>';
                var lt9 = '<td>' + res["list"][li]["userIdentity"] + '</td>';
                var lt10 = '<td><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-user tbody').append(lt1 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7 + lt8 + lt9 + lt10);
            }
            $('.btn-del').click(function() {
                var listId = new Array();
                $('.check-input').each(function() {
                    if ($(this).prop("checked")) {
                        listId.push($(this).parent().parent().attr("userid"));
                    }
                })
                if (confirm("您确定要删除"+listId.length+"条吗?")) {
                    var lisId = $.makeArray(listId);
                    $.ajax({
                        type:"get",
                        url:"/delectUser",
                        async:true,
                        traditional: true,
                        data: {"list": lisId},
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
//获取系别
$.ajax({
    type:"get",
    url:"/selectSystem",
    async:true,
    success:function(res) {
        for (var i = 0; i < res.length; i++) {
            $('#department').append('<option sysid="'+ res[i]["userUid"] +'">'+ res[i]["userSystem"] +'</option>');
            $('#userSystem').append('<option sysid="'+ res[i]["userUid"] +'">'+ res[i]["userSystem"] +'</option>');
        }
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
    }
});
send_data(1);