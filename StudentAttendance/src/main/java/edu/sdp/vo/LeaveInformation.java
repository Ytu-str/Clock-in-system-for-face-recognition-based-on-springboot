package edu.sdp.vo;

import lombok.Data;

/**
 * 请假信息
 */
@Data
public class LeaveInformation {
    private String userId; //学生唯一标识
    private String userStunum; //学号
    private String userName;//姓名
    private String userSystem;  //系别
    private String userClass; //班级
    private String leaveTime;// 时长
    private String leaveType; //类型
    private String leaveReason;//原因
    private String leaveCount;//审批理由
    private String leaveId; //请假信息唯一标识
    private String leaveState;//状态
    private String leaveTeacher; //请假老师
    private String teacherName; //老师姓名
}
