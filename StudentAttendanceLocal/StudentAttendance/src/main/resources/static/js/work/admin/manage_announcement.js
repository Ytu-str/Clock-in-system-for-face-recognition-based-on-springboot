function ud() {
    //更改信息
    $('.btn-upd').click(function() {
        var upann = $(this).parent().siblings().eq(1).text();
        $('#upAnnouncementContent').val(upann);
        upAnnouncementId = $(this).parent().parent().attr("annid");
    });
    //删除信息
    $('.btn-del').click(function() {
        if (confirm("您确定要删除吗?")) {
            var listId = new Array();
            listId.push($(this).parent().parent().attr("annid"));
            var lisId = $.makeArray(listId);
            $.ajax({
                type:"get",
                url:"/adminDeleteNotice",
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
    var keyWord = $('#Keyword').val();
    $.ajax({
        type:"get",
        url:"/adminSelectNotice",
        async:true,
        data: {"content": keyWord, "num": pageNum},
        success: function(res) {
            page(res['num'], 10);
            $('#all-announcement tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                var lt1 = '<tr annid="' + res["list"][li]["noticeId"] + '">';
                var lt2 = '<td>' + res["list"][li]["noticeTime"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["noticeContent"] + '</td>';
                var lt4 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-announcement tbody').append(lt1 + lt2 + lt3 + lt4);
            }
            ud();
            fKeyWord = keyWord;
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

function fanye(pageNum) {
    $.ajax({
        type:"get",
        url:"/searchTeacherClass",
        async:true,
        data: {"content": fKeyWord, "num": pageNum},
        success: function(res) {
            $('#all-announcement tbody tr').remove();
            for (var li = 0; li < res["list"].length; li++) {
                var lt1 = '<tr annid="' + res["list"][li]["noticeId"] + '">';
                var lt2 = '<td>' + res["list"][li]["noticeTime"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["noticeContent"] + '</td>';
                var lt4 = '<td><button class="btn btn-purplee btn-xs btn-upd" data-toggle="modal" data-target="#staticBackdrop3"><i class="fa fa-italic"></i></button><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
                $('#all-announcement tbody').append(lt1 + lt2 + lt3 + lt4);
            }
            ud();
        },
        error: function(e) {
            console.log('出错了');
        }
    });
}

var upAnnouncementId = "";
var fKeyword = "";
var page_index = null;

$('#select').click(function() {
    send_data(1);
});

$('#updann').click(function () {
    var upAnnouncementContent = $('#upAnnouncementContent').val();
    $.ajax({
        type: "get",
        url: "/adminUpdateNotice",
        async: true,
        data: {"noticeId": upAnnouncementId, "content": upAnnouncementContent},
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
$('#addann').click(function () {
    var annContent = $('#announcementContent').val();
    $.ajax({
        type: "get",
        url: "/adminInsertNotice",
        async: true,
        data: {"content": annContent},
        success: function (res) {
            if (res) {
                alert("发布成功");
            } else {
                alert("发布失败");
            }
            window.location.reload();
        },
        error: function (e) {
            console.log("出错");
        }
    })
});

send_data(1);