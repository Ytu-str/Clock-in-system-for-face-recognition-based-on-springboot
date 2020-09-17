package edu.sdp.vo;

import lombok.Data;

/**
 * 修改的个人信息
 */
@Data
public class Information extends UserSuper{
    private String userIdentity;
    private String userStunum;
    private String userSystem;
    private String userClass;

}
