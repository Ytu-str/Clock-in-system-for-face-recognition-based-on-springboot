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
                listId.push($(this).parent().parent().attr("annid"));
            }
        })
        if (confirm("您确定要删除"+listId.length+"条吗?")) {
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
                var lt2 = '<td><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["noticeTime"] + '</td>';
                var lt3 = '<td>' + res["list"][li]["noticeContent"] + '</td>';
                var lt4 = '<td><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
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
                var lt4 = '<td><button class="btn btn-danger btn-xs btn-del"><i class="fa fa-trash"></i></button></td></tr>';
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

send_data(1);