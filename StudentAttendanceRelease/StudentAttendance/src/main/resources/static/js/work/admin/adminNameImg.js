$.ajax({
    type:"get",
    url:"/teacherInformationHead",
    async:false,
    success: function(res) {
        $('#adminName').append(res[0]['userName'] + "管理员");
        $('#adminImg').attr("src", res[0]['userPortrait']);
    },
    error: function(e) {

    }
});