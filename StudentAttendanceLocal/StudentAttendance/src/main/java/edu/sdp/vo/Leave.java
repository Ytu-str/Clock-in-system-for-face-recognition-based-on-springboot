package edu.sdp.vo;

import lombok.Data;

import java.util.UUID;

@Data
public class Leave {
    private String leaveTeacher; //请假老师唯一标识
    private String leaveStudent;//请假学生唯一标识
    private String leaveTime; //请假时长
    private String leaveType;  //请假类型
    private String leaveReason; //请假原因
    private String leaveId;  //唯一标识
    private Integer leaveState;  //状态
    private String leaveContent; //请假内容

    public Leave(){
        this.leaveId= UUID.randomUUID().toString().replace("-","").toUpperCase();
        this.leaveState=0;
    }

}
