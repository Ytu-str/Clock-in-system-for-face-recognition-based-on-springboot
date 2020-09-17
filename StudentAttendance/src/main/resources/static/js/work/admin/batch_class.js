function ud() {

    //更改信息
    $('.btn-upd').click(function() {
        var upclassName = $(this).parent().siblings().eq(0).text();
        $("#upclass").val(upclassName);
        upClassId = $(this).parent().parent().attr("classid");
    });
    //删除信息
    $('.btn-del').click(function(e) {
        $('.check-input').each(function() {
            if ($(this).prop("checked")) {
                $delArray.push($(this));
            }
        });
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
                    var lt2 = '<td><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["dclassList"][a]["userClass"] + '</td>';
                    var lt3 = '<td sysid="'+ res["list"][li]["userUid"] +'">' + res["list"][li]["userSystem"] + '</td>';
                    var lt4 = '<td><button id="d" class="btn btn-danger btn-xs btn-del" data-toggle="modal" data-target="#staticBackdrop4"><i class="fa fa-trash"></i></button></td></tr>';
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
                    var lt2 = '<td><input type="checkbox" name="userStunum" class="check-input"/>' + res["list"][li]["dclassList"][a]["userClass"] + '</td>';
                    var lt3 = '<td>' + res["list"][li]["userSystem"] + '</td>';
                    var lt4 = '<td><button id="d" class="btn btn-danger btn-xs btn-del" data-toggle="modal" data-target="#staticBackdrop4"><i class="fa fa-trash"></i></button></td></tr>';
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
var upClassId = "";
var page_index = null;
var $delArray = new Array();



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
        }
        department = $('#department option').eq(0).attr("sysid");
        $('#department').change(function() {
            department = $('#department option:selected').attr('sysid');
        });
    }
});

//删除
$('#del-class-department-btn').click(function() {
    var departmentListId = new Array();
    var classListId = new Array();
    for (var i = 0; i < $delArray.length; i++) {
        if ($('#del-motal').val() == "系别") {
            if (departmentListId == null) {
                departmentListId.push($($delArray[i]).parent().next().attr("sysid"));
                console.log("null")
            } else {
                var deFlag = false;
                for (var f = 0; f < departmentListId.length; f++) {
                    if (departmentListId[f] == $($delArray[i]).parent().next().attr("sysid")) {
                        deFlag = true;
                    }
                }
                if (!deFlag) {
                    departmentListId.push($($delArray[i]).parent().next().attr("sysid"));
                }
            }
        } else {
            classListId.push($delArray[i].parent().parent().attr("classid"));
        }
    }
    if (departmentListId.length > 0) {
        if (!confirm("您一共选中了" + departmentListId.length + "个系，您确定要删除吗？")) {
            return;
        }
    } else {
        if (!confirm("您一共选中了" + classListId.length + "个班，您确定要删除吗？")) {
            return;
        }
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