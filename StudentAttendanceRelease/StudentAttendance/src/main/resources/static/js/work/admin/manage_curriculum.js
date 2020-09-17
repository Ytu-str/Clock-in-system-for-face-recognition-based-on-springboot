function ud() {
    //更改信息
    $('.btn-upd').click(function() {
        var upstunum = $(this).parent().siblings().eq(1).text();
        var upques = $(this).parent().siblings().eq(5).text();
        $("#ucurriculumName").val(upstunum);
        $('#ucurriculumIntroduce').val(upques);
        upCurriculumId = $(this).parent().parent().attr("curId");
    });
    //删除信息
    $('.btn-del').click(function() {
        if (confirm("您确定要删除吗?")) {
            var listId = new Array();
            listId.push($(this).parent().parent().attr("curId"));
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
                var lt8 = '<td>' + res["list"][li]["clsId"] + '</td>';
                var lt2 = '<td>' + res["list"][li]["clsName"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["date"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["num"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["userName"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["cls"] + '</td>';
                var lt7 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
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
                var lt8 = '<td>' + res["list"][li]["clsId"] + '</td>';
                var lt2 = '<td>' + res["list"][li]["clsName"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["date"] + '</td>';
                var lt4 = '<td>' + res["list"][li]["num"] + '</td>';
                var lt5 = '<td>' + res["list"][li]["userName"] + '</td>';
                var lt6 = '<td>' + res["list"][li]["cls"] + '</td>';
                var lt7 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-curriculum tbody').append(lt1 + lt8 + lt2 + lt3 + lt4 + lt5 + lt6 + lt7);
            }
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

var a_data = {};
var upCurriculumId = "";
var upTeacherName = "";
var page_index = null;
var adTeacherName = "";

$('#select').click(function() {
    send_data(1);
});
//获取老师id及名字
$.ajax({
    type:"get",
    url:"/selectTeacher",
    async:true,
    success:function(res) {
        for (var i = 0; i < res.length; i++) {
            $('#add-teacher').append('<option teacherid="'+ res[i]["teacherId"] +'">'+ res[i]["teacherName"] +'</option>');
            $('#up-teacher').append('<option teacherid="'+ res[i]["teacherId"] +'">'+ res[i]["teacherName"] +'</option>');
        }
        adTeacherName = $('#add-teacher option').eq(0).attr("teacherid");
        upTeacherName = $('#up-teacher option').eq(0).attr("teacherid");
        $('#add-teacher').change(function() {
            adTeacherName = $('#add-teacher option:selected').attr("teacherid");
        });
        $('#up-teacher').change(function() {
            adTeacherName = $('#up-teacher option:selected').attr("teacherid");
        });
    }
});

$('#updatecur').click(function () {
    var ccurName = $('#ucurriculumName').val();
    var ccurContent = $('#ucurriculumIntroduce').val();
    $.ajax({
        type: "get",
        url: "/adminUpdateCurriculum",
        async: true,
        data: {"clsName": ccurName, "cls": ccurContent, "clsAscription": upTeacherName, "clsId": upCurriculumId},
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
    })
});

//添加
$('#addcur').click(function () {
    var curName = $('#curriculumName').val();
    var curContent = $('#curriculumIntroduce').val();
    $.ajax({
        type: "get",
        url: "/adminInsertCurriculum",
        async: true,
        data: {"clsName": curName, "cls": curContent, "clsAscription": adTeacherName},
        success: function (res) {
            if (res) {
                alert("添加成功");
            } else {
                alert("添加失败");
            }
            window.location.reload();
        },
        error: function (e) {
            console.log("出错");
        }
    })
});

send_data(1);