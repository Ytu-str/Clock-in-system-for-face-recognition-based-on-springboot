addEventListener("load", function () {
	setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
	window.scrollTo(0, 1);
}
/* 记住密码 */
 	function SetPwdAndChk() {
        //取用户名
        var usr = document.getElementById('name').value;
        var pass = document.getElementById('pass').value;
        //发送登录请求
        $.ajax({
            type:"POST",
            url:"/validate_password",
            data:{'name': usr,'password': pass},
            success :function(data) {
                if(data === 1){
                    window.location.href="https://www.shineqianmo.com/index";
                }else if (data === 3) {
                    alert('用户不存在')
                } else if (data === 2){
                    alert('密码错误')
                } else {
                    alert("出现了错误")
                }
            },
            error :function(e) {
                alert("出现错误");
            }
        });
        //将最后一个用户信息写入到Cookie
        SetLastUser(usr);
        //如果记住密码选项被选中
        if (document.getElementById('remember').checked == true) {
            //取密码值
            var pwd = document.getElementById('pass').value;
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
            //将用户名和密码写入到Cookie
            SetCookie(usr, pwd, expdate);
        } else {
            //如果没有选中记住密码,则立即过期
            ResetCookie();
        }
    }

    function SetLastUser(usr) {
        var id = "49BAC005-7D5B-4231-8CEA-16939BEACD67";
        var expdate = new Date();
        //当前时间加上两周的时间
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
        SetCookie(id, usr, expdate);
    }
    //用户名失去焦点时调用该方法
    function GetPwdAndChk() {
        var usr = document.getElementById('name').value;
        var pwd = GetCookie(usr);
        if (pwd != null) {
            document.getElementById('remember').checked = true;
            document.getElementById('pass').value = pwd;
        } else {
            document.getElementById('remember').checked = false;
            document.getElementById('pass').value = "";
        }
    }
    //取Cookie的值
    function GetCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            //alert(j);
            if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    }

    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    }
    //写入到Cookie
    function SetCookie(name, value, expires) {
        var argv = SetCookie.arguments;
        //本例中length = 3
        var argc = SetCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        var path = (argc > 3) ? argv[3] : null;
        var domain = (argc > 4) ? argv[4] : null;
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    }

    function ResetCookie() {
        var usr = document.getElementById('name').value;
        var expdate = new Date();
        SetCookie(usr, null, expdate);
    }
//input
$('.agile-field-txt input').click(function() {
    $('.agile-field-txt input').removeClass('input-active');
    $(this).addClass('input-active');
});