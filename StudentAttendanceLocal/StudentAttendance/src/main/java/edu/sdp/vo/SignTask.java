package edu.sdp.vo;

import lombok.Data;

import java.util.Date;

/**
 * 签到任务表
 */
@Data
public class SignTask {
    private String tsignUid; //签到任务唯一标识
    private Date tsignStartDate;  //开始时间
    private Date tsignEndDate; //结束时间
    private String tsignClassId;  //课程唯一标识
    private Integer tsignState;  //签到状态
    public SignTask(){
        this.tsignState=1;
    }
}
