addEventListener("load", function () {
	setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
	window.scrollTo(0, 1);
}
function myFunction() {
	var x = document.getElementById("pass");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
	var x = document.getElementById("ipass");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}
var userNumber = "";
$('#changpass-btn').click(function () {
	$('#changnumber').hide();
	userNumber = $('#userNumber').val();
	$.ajax({
		type:"get",
		url:"/secretGuard",
		data:{'userNumber': userNumber},
		success :function(res) {
			console.log(res)
			$('#userQues').val(res);
		},
		error :function(e) {
			alert("出现错误");
		}
	});
	$('#changpassss').show();
});

$('#changPassword-btn').click(function () {
	var userpass = $('#pass').val();
	var iuserpass = $('#ipass').val();
	var useran = $('#userAnswer').val();
	if (userpass == iuserpass) {
		$.ajax({
			type:"get",
			url:"/getChangPas",
			data:{'userNumber': userNumber, "userAnswer": useran, "userPass": userpass},
			success :function(res) {
				alert("修改成功!");
				window.location.href = "https://www.shineqianmo.com/login";
			},
			error :function(e) {
				alert("出现错误");
			}
		});
	} else {
		alert("两次输入密码不一致请重新输入!");
		$('#pass').val("");
		$('#ipass').val("");
	}
});