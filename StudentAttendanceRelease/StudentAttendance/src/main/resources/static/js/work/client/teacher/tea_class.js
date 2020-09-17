// ChartJS
if(window.Chart) {
	Chart.defaults.global.defaultFontFamily = "'Segoe UI', 'Arial'";
	Chart.defaults.global.tooltips.backgroundColor = '#000';
	Chart.defaults.global.tooltips.titleFontFamily = 'Segoe UI';
	Chart.defaults.global.tooltips.titleFontColor = '#fff';
	Chart.defaults.global.tooltips.xPadding	= 10;
	Chart.defaults.global.tooltips.yPadding	= 12;
	Chart.defaults.global.tooltips.cornerRadius	= 3;
}

// DropzoneJS
if(window.Dropzone) {
	Dropzone.autoDiscover = false;
}

// Global
$(function() {
	if($(".main-sidebar").length) {
		$(".main-sidebar").niceScroll({
			cursoropacitymin: .1,
			cursoropacitymax: .8,
		});
		var sidebar_nicescroll = $(".main-sidebar").getNiceScroll();
//
//		$(".main-sidebar .sidebar-menu li a.has-dropdown").on('click', function() {
//			var me = $(this);
//
//			me.parent().find('> .menu-dropdown').slideToggle(500, function() {
//				sidebar_nicescroll.resize();
//			});
//			return false;
//		});
	}

	$(".main-content").css({
		minHeight: $(window).outerHeight() - 95
	})

	$("[data-toggle='sidebar']").click(function() {
		var body = $("body");

		body.removeClass('search-show search-gone');
		if(body.hasClass('sidebar-gone')) {
			body.removeClass('sidebar-gone');
			body.addClass('sidebar-show');
			sidebar_nicescroll.resize();
		}else{
			body.addClass('sidebar-gone');
			body.removeClass('sidebar-show');
			sidebar_nicescroll.resize();
		}
		return false;
	});

	$("[data-toggle='search']").click(function() {
		var body = $("body");

		if(body.hasClass('search-gone')) {
			body.addClass('search-gone');
			body.removeClass('search-show');
		}else{
			body.removeClass('search-gone');
			body.addClass('search-show');
		}
	});

	var toggleSidebar = function() {
		var w = $(window);
		if(w.outerWidth() <= 1024) {
			$("body").addClass("sidebar-gone");
			$("body").off('click').on('click', function(e) {
				if($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
					$("body").removeClass("sidebar-show");
					$("body").addClass("sidebar-gone");
					$("body").removeClass("search-show");
				}
			});
		}else{
			$("body").removeClass("sidebar-gone");
		}
	}
	toggleSidebar();
	$(window).resize(toggleSidebar);

	// tooltip
	$("[data-toggle='tooltip']").tooltip();

	// popover
	$('[data-toggle="popover"]').popover({
		container: 'body'
	});

	$(".notification-toggle").dropdown();
	$(".notification-toggle").parent().on('shown.bs.dropdown', function() {
		$(".dropdown-list-content").niceScroll({
			cursoropacitymin: .3,
			cursoropacitymax: .8,
			cursorwidth: 7
		});
	});

	if(jQuery().summernote) {
		$(".summernote").summernote({
			minHeight: 250,
		});
		$(".summernote-simple").summernote({
			minHeight: 150,
			toolbar: [
				['style', ['bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough']],
				['para', ['paragraph']]
			]
		});
	}


	// Collapsable
	$("[data-collapse]").each(function() {
		var me = $(this),
			target = me.data('collapse');

		me.click(function() {
			$(target).collapse('toggle');
			$(target).on('shown.bs.collapse', function() {
				me.html('<i class="ion ion-minus"></i>');
			});
			$(target).on('hidden.bs.collapse', function() {
				me.html('<i class="ion ion-plus"></i>');
			});
			return false;
		});
	});

	// Background
	$("[data-background]").each(function() {
		var me = $(this);
		me.css({
			backgroundImage: 'url(' + me.data('background') + ')'
		});
	});

	// Custom Tab
	$("[data-tab]").each(function() {
		var me = $(this);

		me.click(function() {
			if(!me.hasClass('active')) {
				var	tab_group = $('[data-tab-group="' + me.data('tab') + '"]'),
					tab_group_active = $('[data-tab-group="' + me.data('tab') + '"].active'),
					target = $(me.attr('href')),
					links = $('[data-tab="'+me.data('tab') +'"]');

				links.removeClass('active');
				me.addClass('active');
				target.addClass('active');
				tab_group_active.removeClass('active');
			}
			return false;
		});
	});

	// Bootstrap 4 Validation
	$(".needs-validation").submit(function() {
		var form = $(this);
		if (form[0].checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.addClass('was-validated');
	});

	// alert dismissible
	$(".alert-dismissible").each(function() {
		var me = $(this);

		me.find('.close').click(function() {
			me.alert('close');
		});
	});

	if($('.main-navbar').length) {
		$(".main-navbar").scrollupbar({
			enterViewport: function() {
				$(".main-navbar").addClass('active');
			},
			exitViewport: function() {
				$(".main-navbar").removeClass('active');
			}
		});

		$(window).scroll(function() {
			if($(this).scrollTop() == 0) {
				$(".main-navbar").removeClass('active');
			}
		});
	}
});

$.ajax({
	type:"get",
	url:"/teacherInformationHead",
	async:false,
	success: function(res) {
		$('#helloTeacherName').append("您好，" + res[0]['userName'] + "老师");
		$('#teacherName').append(res[0]['userName'] + "老师");
		$('#teacherImg').attr("src", res[0]['userPortrait']);
	},
	error: function(e) {

	}
});



$('#img').click(function() {
	$('#clsImage').click();
});
document.getElementById("clsImage").onchange=function(e){
	var imgURL=window.URL.createObjectURL(e.target.files[0]) ;
	$('#img').attr("src", imgURL);
}
function send_data(page) {
	present_number = page;
	$.ajax({
		type:"get",
		url:"/searchStudentClass",
		async:true,
		data:{'teacherClassNum': page},
		success: function(res) {
			$('.card-all').empty();
			for(var i = 0, a = 0; i < res.length; i++) {
				if (i == 4 || i == 8) {
					a++;
				}
				var htm1 = '<div class="col-lg-3 col-md-5 col-10 col-sm-7 ml-lg-0 ml-md-6 m-sm-auto m-lg-0">';
				var htm2 = '<div class="card" teacher-id="'+ res[i]["clsId"] +'">';
				var htm3 = '<img src="'+ res[i]["clsPhoto"] +'" class="card-img-top">';
				var htm4 = '<div class="card-body">';
				var htm5 = '<h5 class="card-title">'+ res[i]["clsName"] +'</h5>';
				var htm6 = '<p class="card-text card-text-h">'+ res[i]["cls"] +'</p>';
				var htm7 = '</div></div></div>';
				$($('.card-all')[a]).append(htm1 + htm2 + htm3 + htm4 + htm5 + htm6 + htm7);
			}
			$('.card').click(function() {
				var clsId = $(this).attr('teacher-id');
				window.open("https://www.shineqianmo.com/classSign?clsId=" + clsId);
			})
		},
		error: function(e) {
			alert('出错2');
		}
	});
}

function all_number() {
	$.ajax({
		type:"get",
		url:"/classNumCount",
		async: false,
		success: function(res) {
			all = res;
		},
		error: function(e) {
			alert('出错1');
		}
	});
}
var page_number = 12;

//当前页
var present_number = 1;

$('#next-page').click(function() {
	$($('.click-page')[present_number + 1]).click();
});
$('#prev-page').click(function() {
	$($('.click-page')[present_number - 1]).click();
});


$('#clsSubmint').click(function() {
	var clsName = $('#clsName').val();
	var clsContent = $('#clsContent').val();
	var formdata = new FormData();
	var clsFile = document.getElementById('clsImage').files;
	formdata.append("clsPhoto",clsFile[0]);
	formdata.append("clsName", clsName);
	formdata.append("cls", clsContent);
	$.ajax({
		type:"post",
		url:"/creatingCourses",
		data: formdata,
		contentType:false,
		async: false,
		processData: false,
		success: function(res) {
			if(res) {
				alert("添加成功");
			} else {
				alert("添加失败");
			}
			window.location.reload();
		},
		error: function(e) {
			alert("出错了");
			//window.location.reload();
		}
	});
});
