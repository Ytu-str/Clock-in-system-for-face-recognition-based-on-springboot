$.ajax({
	type:"get",
	url:"/adminIndexIntInformation",
	async:false,
	success: function(res) {
		$('#register-body').append(res[0]);
		$('#class-body').append(res[1]);
		$('#sign-body').append(res[2]);
		$('#department-body').append(res[3]);
	},
	error: function(e) {
		console.log("出错");
	}
});
$.getJSON('https://tianqiapi.com/api?version=v1&appid=93432764&appsecret=57dGCogk', function(res) {
	$('#weather').append('<h2 class="pt-5">'+ res["city"] +'</h2><h2>'+ res["data"][0]["tem2"] +'</h2><h4>'+ res["data"][0]["wea"] +'</h4>');
});

$('#email-btn').click(function () {
	var content = $('#exampleInputText').val();
	$.ajax({
		type: "get",
		url: "/adminSendMail",
		async: false,
		data: {
			"content": content
		},
		success: function(res) {
			alert("您的建议我们已经收到会尽快处理哦");
			window.location.reload();
		},
		error: function(e) {
			console.log("失败");
		}
	});
});