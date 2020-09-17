package edu.sdp.vo;


import lombok.Data;



@Data
public class SignNum {
    private int signNum; //签到人数
    private int unSignNum; //未签到人数
    private String time;
}
