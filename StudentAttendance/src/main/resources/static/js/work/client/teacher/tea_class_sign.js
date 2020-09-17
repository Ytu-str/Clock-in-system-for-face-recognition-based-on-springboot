function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

var signNum = [];
var signNoNum = [];
var signDate = [];
$.ajax({
    type:"get",
    url:"/login/signNums",
    async:false,
    success: function(res) {
        for (var i = res.length - 1; i >= 0; i--) {
            signNum.push(parseInt(res[i]["signNum"]));
            signNoNum.push(parseInt(res[i]["unSignNum"]));
            signDate.push(res[i]["time"]);
        }
    },
    error: function(e) {

    }
});
option1 = {
    title: {
        text: '近七次签到情况',
        top: '10px',
        left: '10px'
    },
    tooltip: {
        trigger: 'axis'
    },
    backgroundColor: '#ffffff',
    color: ['red', 'green'],
    legend: {
        top: '10px',
        data: ['已签到', '未签到']
    },
    grid: {
        left: '5%',
        right: '4%',
        bottom: '6%',
    },
    xAxis: {
        type: 'category',
        boundaryGap: true,
        data: signDate
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '未签到',
        type: 'line',
        lineStyle: {
            normal: {
                color: 'red'
            }
        },
        data: signNoNum
    },
        {
            name: '已签到',
            type: 'line',
            lineStyle: {
                normal: {
                    color: 'green'
                }
            },
            data: signNum
        }
    ]
};
var myChart1 = echarts.init(document.getElementById('broken-line'));
myChart1.setOption(option1);

//获取课程内容
$.ajax({
    type:"get",
    url:"/searchTeacherClassInformation",
    async:true,
    success: function(res) {
        $('.card-img').attr('src', res['clsPhoto']);
        $('.h-header div').eq(0).text(res['clsName'] + "                  (复制此段让学生加入此课程吧)" + res['clsId']);
        $('.h-header').attr('curriculum-id', res['clsId']);
        $('.card-text-height').text(res['cls']);
        $(".card-body h4 b").text(res["num"] - 1);
    },
    error:function(e) {
        alert('出错');
    }
});
//发送作业
$('#homework-btn').click(function () {
    var homeWorkClassId = $('.h-header').attr('curriculum-id');
    var homeWorkContent = $('#homework-text').val();
    $.ajax({
        type:"get",
        url:"/homeWork",
        async:false,
        data: {"clsId": homeWorkClassId, "content": homeWorkContent},
        success: function(res) {
            if (res) {
                alert("作业已发出!");
            } else {
                alert("作业发送失败!");
            }
            $('#homework-cancel').click();
        },
        error:function(e) {
            alert('出错');
        }
    });
});
//发布考勤
$('#t-m-sign').click(function() {
	var sign_time = $('#sign-input-text').val();
	var clsId = $('.h-header').attr('curriculum-id');
	console.log(sign_time);
	console.log(clsId);
	$.ajax({
		type: "post",
		url: "/login/issueSignIn",
		data: {
            'clsId': clsId,
			'time': parseInt(sign_time)
		},
		async: true,
		success: function(res) {
			if(res) {
				alert('发布成功');
			} else {
				alert('发布失败');
			}
			window.location.reload();
		},
		error: function(e) {
			alert('出错');
			window.location.reload();
		}
	});
})

$.ajax({
    type:"get",
    url:"/login/PersonnelList",
    async:true,
    success: function(res) {
        for (var i = 0; i < res.length; i++) {
            var noSignTbodyText1 = '<tr class="bg-white"><th scope="row">' + res[i]["userStunum"] + '</th>';
            var noSignTbodyText2 = '<td>'+ res[i]["userName"] +'</td></tr>';
            $('#nosign-tbody').append(noSignTbodyText1 + noSignTbodyText2);
        }
    },
    error: function(e) {

    }
});
$('#t-record').click(function () {
    var clsId = getUrlParam("clsId");
    window.open("http://localhost:8080/exportData?clsId=" + clsId);
});
