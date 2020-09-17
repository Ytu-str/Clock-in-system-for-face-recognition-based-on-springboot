$.ajax({
	type:"get",
	url:"selectInboxContent",
	async:false,
	success: function(res) {
		$('#inbox-particulars h2').text(res["userName"]);
		$('.inbox-content span').eq(0).text(res["inboxType"]);
		$('.inbox-content span').eq(1).text(res["inboxDate"]);
		$('.inbox-content p').text(res["inboxContent"]);
	},
	error: function(e) {
		alert('出错了');
	}
});