//全选
$('#check-all').click(function() {
	$('.check-input').prop("checked", true);
});
//反选
$('#check-reverse').click(function() {
	$('.check-input').each(function() {
		$(this).prop("checked", !$(this).prop("checked"));
	})
});
//取消
$('#check-noall').click(function() {
	$('.check-input').prop("checked", false);
});
