package edu.sdp.vo;

import lombok.Data;

/**
 * 老师创建的班级
 */
@Data
public class TeacherClass extends Curriculum{
    private String clsId;  //课程的唯一标识
    private int num; //加入课程人数
    private String date; //课程创建时间
    private String userName; //用户姓名
}
