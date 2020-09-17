$('.left-information a').eq(0).click(function() {
	$stusystem = $('#stusystem');
	$stuclass = $('#stuclass');
	$(this).hide();
	$('#stusystem').remove();
	$('#stuclass').remove()
	$('.row-messager').eq(6).append('<select id="selsystem" class="select-change"></select>');
	$('.row-messager').eq(7).append('<select id="selclass" class="select-change"></select>');
	$('.change-message').attr({"readOnly":false});
	$('.change-message').removeClass('input-border');
	$('#sub').css('display', 'block');
	$('#sub-no').css('display', 'block');
	//获取系别
	$.ajax({
		type: "get",
		url: "/selectSystem",
		async: true,
		success: function(res) {
			for(var i = 0; i < res.length; i++) {
				$('#selsystem').append('<option sysid="' + res[i]["userUid"] + '">' + res[i]["userSystem"] + '</option>');
			}
			stusystem = $('#selsystem option').eq(0).attr("sysid");
			$.ajax({
				type: "get",
				url: "/selectClass",
				async: false,
				data: {
					"userUid": stusystem
				},
				success: function(res) {
					$('#selclass option').remove();
					for(var c = 0; c < res.length; c++) {
						$('#selclass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
					}
					$('#selclass').change(function() {
						stuclass = $('#selclass option:selected').attr("classid");
					});
					stuclass = $('#selclass option').eq(0).attr("classid");
				}
			});
			$('#selsystem').change(function () {
				stusystem = $('#selsystem option:selected').attr("sysid");
				$.ajax({
					type: "get",
					url: "/selectClass",
					async: false,
					data: {
						"userUid": stusystem
					},
					success: function(res) {
						$('#selclass option').remove();
						for(var c = 0; c < res.length; c++) {
							$('#selclass').append('<option classid="' + res[c]["classId"] + '">' + res[c]["userClass"] + '</option>')
						}
						$('#selclass').change(function() {
							stuclass = $('#selclass option:selected').attr("classid");
						});
						stuclass = $('#selclass option').eq(0).attr("classid");
					}
				});
			})
		}
	});
});

$('#sub-no').click(function() {
	$('.change-message').addClass('input-border');
	$('.change-message').attr({"readOnly":true});
	$('#selsystem').remove();
	$('#selclass').remove();
	$('.row-messager').eq(6).append($stusystem);
	$('.row-messager').eq(7).append($stuclass);
	$('#sub').css('display', 'none');
	$('#sub-no').css('display', 'none');
	$('.left-information a').show();
});

//获取数据
$.ajax({
	type:"post",
	url:"/selectInformation",
	async:false,
	success: function(res) {
		$('#iName').val(res['userIname']);
		$('#number').val(res['userNumber']);
		$('#name').val(res['userName']);
		$('#identity').val(res['userIdentity']);
		$('#stunumber').val(res['userStunum']);
		$('#stusystem').val(res['userSystem']);
		$('#stuclass').val(res['userClass']);
		$('.left-information img').attr('src', res['userPortrait']);
	},
	error: function(e) {
		console.log('无数据');
	}
});

var $stusystem;
var $stuclass;
var stusystem;
var stuclass;
//修改请求
$('#sub').click(function() {
	var iName = $('#iName').val();
	var stunumber = $('#stunumber').val();
	$.ajax({
		type:"post",
		url:"/modify",
		async:true,
		data:{'iname': iName, 'stunum': stunumber, 'system': stusystem,'class': stuclass},
		success: function(res) {
			if (res) {
				alert('修改成功');
				location.reload();
			}
		},
		error: function(e) {
			alert('出现错误');
		}
	});
});

$('.left-information a').eq(1).click(function() {
	$('#updateimg').click();
});

$('#updateimg').change(function() {
	var formData = new FormData();
	var avater = document.getElementById('updateimg').files;
	formData.append("avatar", avater[0]);
	$.ajax({
		type: "post",
		url: "/ModifyTheAvatar",
		contentType:false,
		async: false,
		processData: false,
		data: formData,
		success: function(res) {
			alert(res);
		}
	});
})
