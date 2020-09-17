package edu.sdp.vo.admin;

import lombok.Data;

@Data
public class AdminUser {
    private String userId; //唯一标识
    private String userStunum; //学号
    private String userSystem;//系别
    private String userClass;//班级
    private String userQues; //密保问题
    private String userAnswer;//密保答案
    private String userName;//用户姓名
    private String userNumber;//用户账号
    private String userIdentity;//身份证号

}
