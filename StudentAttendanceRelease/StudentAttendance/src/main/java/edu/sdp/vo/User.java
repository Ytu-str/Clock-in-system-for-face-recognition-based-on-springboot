package edu.sdp.vo;

import lombok.Data;

@Data
public class User extends UserSuper{

    private String userPass;
    private String userId;
    private Integer userJion;


}
