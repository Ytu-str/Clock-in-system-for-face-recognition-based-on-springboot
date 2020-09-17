package edu.sdp.vo;

import lombok.Data;

/**
 * 学生加入的班级
 */
@Data
public class StudentClass extends Curriculum {
    private String userName; //老师姓名
    private String userId;  //老师的唯一标识
    private String clsId;  //课程唯一标识

}
