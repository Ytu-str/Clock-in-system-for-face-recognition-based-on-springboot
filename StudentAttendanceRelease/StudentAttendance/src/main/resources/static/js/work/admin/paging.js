/**
 * 
 * @param {Object} all            总条数
 * @param {Object} page_number    每页条数
 */
function page(all,page_number) {
	$('.page-item').remove();
	//页数
	var all_page = Math.ceil(all / page_number);
	//添加按钮
	$('#card-page').append('<li id="prev-page" class="page-item"><a class="page-link" href="#">上一页</a></li>');
	for(var i = 1; i <= all_page; i++) {
		if(i > 5) {
			$('#card-page').append('<li class="click-page page-item d-none"><a class="page-link" href="#">' + i + '</a></li>');
		} else {
			$('#card-page').append('<li class="click-page page-item"><a class="page-link" href="#">' + i + '</a></li>');
		}
	}
	$('#card-page').append('<li id="next-page" class="page-item"><a class="page-link" href="#">下一页</a></li>');
	$('#prev-page').click(function () {
		page_index = --page_index;
		if (page_index <= 0) {
			page_index = page_index + 1;
			alert("当前已经是第一页");
		} else {
			$($('.click-page')[page_index - 1]).click();
		}
	});
	$('#next-page').click(function () {
		page_index = ++page_index;
		if (page_index >= $('.page-item').length - 1) {
			page_index = page_index - 1;
			alert("当前已经是最后一页");
		}else if(page_index == 1) {
			$($('.click-page')[page_index]).click();
		} else {
			$($('.click-page')[page_index - 1]).click();
		}
	});
	$('.click-page').click(function() {
		$('.click-page').addClass('d-none');
		//页数
		page_index = $(this).index();
		if(page_index <= 2) {
			$(this).removeClass('d-none');
			$(this).next().removeClass('d-none');
			$(this).next().next().removeClass('d-none');
			$(this).next().next().next().removeClass('d-none');
			if(page_index == 1) {
				$(this).next().next().next().next().removeClass('d-none');
			} else {
				$(this).prev().removeClass('d-none');
			}
		} else if(page_index >= (all_page - 1)) {
			$(this).removeClass('d-none');
			$(this).prev().removeClass('d-none');
			$(this).prev().prev().removeClass('d-none');
			$(this).prev().prev().prev().removeClass('d-none');
			if(page_index == all_page) {
				$(this).prev().prev().prev().prev().removeClass('d-none');
			} else {
				$(this).next().removeClass('d-none');
			}
		} else {
			$(this).removeClass('d-none');
			$(this).next().removeClass('d-none');
			$(this).next().next().removeClass('d-none');
			$(this).prev().removeClass('d-none');
			$(this).prev().prev().removeClass('d-none');
		}
		fanye(page_index);
	});
}
