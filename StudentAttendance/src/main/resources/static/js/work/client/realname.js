$('#big-head-btn').click(function() {
	$('.top ul li').eq(1).addClass('active');
	$('.top ul li').eq(2).addClass('active');
	$('.Big-head-photos').css('display', 'none');
	$('.realname-message').css('display', 'block');
});

$('#realname-message-btn').click(function() {
	var file = document.getElementById('file').files;
	var name = $('#name').val();
	var identity = $('#identity').val();
	var formdata = new FormData();
	formdata.append("imag",file[0]);
	formdata.append("name",name);
	formdata.append("identity",identity);
	$.ajax({
		type:"post",
		url:"/realnameMessage",
		data: formdata,
        contentType:false,
        async: false,
        processData: false,
		success: function(res) {
			if (res) {
				$('.top ul li').eq(3).addClass('active');
				$('.top ul li').eq(4).addClass('active');
				$('.realname-message').css('display', 'none');
				$('.realname-success').css('display', 'block');
				var num = 5;
				var jishi = setInterval(function() {
					$('.realname-success h2').text('实名成功,' + (num--) + '秒后跳转到首页');
					if(num === 0) {
						clearInterval(jishi);
						window.location.href = "http://localhost:8080/index";
					}
				}, 1000);
			} else {
				alert('实名失败');
				window.location.href = "http://localhost:8080/realname";
			}
		},
		error: function(e) {
			alert("出现错误");
		}
	});
});


$('#showPicture').click(function() {
	$('#file').click();
});

$('#file').change(function() {
	//获取展示图片的区域
	var img = document.getElementById("showPicture");
	//获取文件对象
	var file = this.files[0];
	//获取文件阅读器
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function() {
		img.setAttribute("src", this.result);
	}
});


$.ajax({
	type:"get",
	url:"/RealNameAuthenticationSuccessful",
	async:false,
	success: function(res){
		if(res) {
			alert("已经实名")
			window.location.href = "http://localhost:8080/index";
		}
	},
	error: function(e){

	}
});