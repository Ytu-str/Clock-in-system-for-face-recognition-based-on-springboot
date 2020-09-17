function ud() {
    //点击选中
    $('#all-user tbody tr').click(function() {
        //现在模式反选
        $(this).children().eq(0).children().eq(0).prop("checked", !$(this).children().eq(0).children().eq(0).prop("checked"));
    })
    //删除信息
    $('.btn-del').click(function() {
        var listId = new Array();
        $('.check-input').each(function() {
            if ($(this).prop("checked")) {
                listId.push($(this).parent().parent().attr("curid"));
            }
        })
        if (confirm("您确定要删除"+listId.length+"条吗?")) {
            var lisId = $.makeArray(listId);
            $.ajax({
                type:"get",
                url:"/adminDeleteCurriculum",
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
}
//获取数据
function send_data(pageNum) {
    var keyWord = $('#curriculumKeyword').val();
    a_data["num"] = pageNum;
    if ($('#sel-type').val() == "课程") {
        a_data["className"] = keyWord;
        delete a_data["teacherName"];
    } else {
        a_data["teacherName"] = keyWord;
        delete a_data["className"];
    }
    if (keyWord == "") {
        delete a_data["teacherName"];
        delete a_data["className"];
    }
    console.log(a_data)
    $.ajax({
        type:"get",
        url:"/searchTeacherClass",
        async:true,
        data: a_data,
        success: function(res) {
            page(res['countNum'], 10);
            $('#all-curriculum tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                var lt1 = '<tr curId="' + res["list"][li]["clsId"] + '">';
                var lt8 = '<td><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["clsId"] + '</td>';
                var lt2 = '<td>' + res["list"][li]["clsName"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["date"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["num"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["userName"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["cls"] + '</td>';
                var lt7 = '<td><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-curriculum tbody').append(lt1 + lt8 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7);
            }
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

function fanye(pageNum) {
    a_data["num"] = pageNum;
    $.ajax({
        type:"get",
        url:"/searchTeacherClass",
        async:true,
        data: a_data,
        success: function(res) {
            $('#all-curriculum tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                var lt1 = '<tr curId="' + res["list"][li]["clsId"] + '">';
                var lt8 = '<td><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["clsId"] + '</td>';
                var lt2 = '<td>' + res["list"][li]["clsName"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["date"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["num"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["userName"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["cls"] + '</td>';
                var lt7 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-curriculum tbody').append(lt1 + lt8 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7);
            }
            //点击选中
            $('#all-curriculum tbody tr').click(function() {
                //现在模式反选
                $(this).children().eq(0).children().eq(0).prop("checked", !$(this).children().eq(0).children().eq(0).prop("checked"));
            });
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

var a_data = {};
var page_index = null;



$('#select').click(function() {
    send_data(1);
});
send_data(1);