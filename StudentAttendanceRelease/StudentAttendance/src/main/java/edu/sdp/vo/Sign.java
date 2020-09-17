package edu.sdp.vo;

import lombok.Data;

import java.util.Date;

@Data
public class Sign {
    private String signId;
    private String signName;
    private Date signTime;
    private String sclaId;
}
