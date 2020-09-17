addEventListener("load", function () {
	setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
	window.scrollTo(0, 1);
}
function myFunction() {
					var x = document.getElementById("myInput");
					if (x.type === "password") {
						x.type = "text";
					} else {
						x.type = "password";
					}
				}
//头像上传
 function preserve()
     {
         var formData    = new FormData();
         var img = $("[name='user_portrait']").prop('files')[0];/*获取上传图片的信息*/
         formData.append("img",img);
         $.ajax({
             type : "post",
             url : "{:URL('admin/Banner/shopbanneradd')}",/*此处填写上传路径*/
             processData : false,
             contentType : false,
             data : formData,
             success : function(data) {
 
             }
         });
     }
     var small_img = document.querySelector('input[name=small_img]');
     var img = document.querySelector('input[name=user_portrait]');
     small_imgs = document.querySelector('#small_img');
     imgs = document.querySelector('#img');
     if (small_img) {
         small_img.addEventListener('change', function() {
             var file = this.files[0];
             var reader = new FileReader();
             // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
             reader.addEventListener("load", function() {
                 small_imgs.src = reader.result;
             }, false);
             // 调用reader.readAsDataURL()方法，把图片转成base64
             reader.readAsDataURL(file);
             $("img").eq(0).css("display", "block");
         }, false);
     }
     if(img){
         img.addEventListener('change', function() {
             var file = this.files[0];
             var reader = new FileReader();
             // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
             reader.addEventListener("load", function() {
                 imgs.src = reader.result;
             }, false);
             // 调用reader.readAsDataURL()方法，把图片转成base64
             reader.readAsDataURL(file);
             $("img").eq(1).css("display", "block");
         }, false);
     }
//input
$('.agile-field-txt input').click(function() {
    $('.agile-field-txt input').removeClass('input-active');
    $(this).addClass('input-active');
});
//注册
$('#registerPass').click(function () {
    //还有一个获取头像
    var formdata = new FormData();
    var file = document.getElementById('portrait').files;
    var number = $('#number').val();
    var iName = $('#iName').val();
    var password = $('#password').val();
    var answer = $('#answer').val();
    var question = $('#question').val();
    formdata.append("portrait",file[0]);
    formdata.append("number",number);
    formdata.append("iName",iName);
    formdata.append("password",password);
    formdata.append("question",question);
    formdata.append("answer",answer);
    $.ajax({
        type: 'POST',
        url: '/registerPass',
        data: formdata,
        contentType:false,
        async: false,
        processData: false,
        success :function(res) {
            alert(res);
            if (res == "注册成功") {
                window.location.href = "http://localhost:8080/login";
            }
        },
        error :function(e) {
            alert("出现错误");
        }
    })
});